import sys
import requests
import json
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from gensim.models import Word2Vec

# Get userId from command-line argument
user_id = sys.argv[1]

# API Endpoints
USER_API = f"http://localhost:4000/user/{user_id}"
FILES_API = "http://localhost:4000/files/all"

# Fetch user details
user_response = requests.get(USER_API)
if user_response.status_code != 200:
    print(json.dumps({"error": "User not found"}))
    sys.exit(1)

user_data = user_response.json()
user_interests = user_data.get("interests", [])

if not user_interests:
    print(json.dumps({"error": "No interests found for user"}))
    sys.exit(1)

# Fetch all files
files_response = requests.get(FILES_API)
if files_response.status_code != 200:
    print(json.dumps({"error": "Failed to fetch files"}))
    sys.exit(1)

files_data = files_response.json()

# Prepare data for TF-IDF
file_tags = [" ".join(file["tags"]) for file in files_data]
user_interests_str = " ".join(user_interests)

# Compute TF-IDF similarity
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(file_tags + [user_interests_str])
similarity_scores = np.dot(tfidf_matrix[-1], tfidf_matrix[:-1].T).toarray()[0]

# Train Word2Vec on file tags
word2vec_model = Word2Vec(sentences=[file["tags"] for file in files_data], vector_size=100, min_count=1, workers=4)

def word2vec_similarity(user_interests, file_tags):
    try:
        user_vec = np.mean([word2vec_model.wv[word] for word in user_interests if word in word2vec_model.wv], axis=0)
        file_vec = np.mean([word2vec_model.wv[word] for word in file_tags if word in word2vec_model.wv], axis=0)
        return np.dot(user_vec, file_vec) / (np.linalg.norm(user_vec) * np.linalg.norm(file_vec))
    except:
        return 0  # If no valid word vectors are found

# Compute Word2Vec similarity
word2vec_scores = [word2vec_similarity(user_interests, file["tags"]) for file in files_data]

# Final score = Weighted sum of TF-IDF and Word2Vec
final_scores = 0.7 * np.array(similarity_scores) + 0.3 * np.array(word2vec_scores)

# Sort files by score
recommended_files = [files_data[i] for i in np.argsort(final_scores)[::-1] if final_scores[i] > 0]

# Return recommendations
print(json.dumps(recommended_files))
