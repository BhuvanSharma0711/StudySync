import sys
import pandas as pd
from surprise import SVD, Dataset, Reader
from surprise.model_selection import train_test_split
import json
import psycopg2

# Get userId from command-line arguments
if len(sys.argv) < 2:
    print(json.dumps({"error": "Missing userId"}))
    sys.exit(1)

user_id = sys.argv[1]

# Connect to PostgreSQL (Update credentials)
conn = psycopg2.connect(
    dbname="db",
    user="postgres",
    password="pass",
    host="localhost",
    port="5432"
)
cursor = conn.cursor()

# Fetch click data (User-File interactions)
cursor.execute('SELECT "userId", "fileId" FROM "Click"')
click_data = cursor.fetchall()

# Fetch file data (tags and uploadedBy)
cursor.execute('SELECT "id", "tags", "uploadedById" FROM "File"')
file_data = cursor.fetchall()

cursor.close()
conn.close()

# Convert click data to DataFrame
df = pd.DataFrame(click_data, columns=['user_id', 'file_id'])
df['interaction_score'] = 1  # Binary clicks

# Convert file data to dictionary
file_info = {}
for file_id, tags, uploaded_by in file_data:
    tags_set = set(tags) if isinstance(tags, list) else set()  # Convert list to set
    file_info[file_id] = {
        "tags": tags_set,
        "uploaded_by": uploaded_by
    }

# Prepare dataset for SVD
reader = Reader(rating_scale=(0, 1))
data = Dataset.load_from_df(df[['user_id', 'file_id', 'interaction_score']], reader)
trainset = data.build_full_trainset()

# Train SVD model
model = SVD(n_factors=50, random_state=42)
model.fit(trainset)

# Function to get users with similar file interactions
def get_similar_users(target_user, n=5):
    user_ids = df['user_id'].unique()
    predictions = []

    target_files = df[df['user_id'] == target_user]['file_id'].tolist()
    target_tags = set()
    
    for file in target_files:
        if file in file_info:
            target_tags.update(file_info[file]['tags'])  # Collect tags from files clicked by user

    for other_user in user_ids:
        if other_user != target_user:
            total_score = 0
            count = 0
            shared_tags = set()

            for file in df[df['user_id'] == other_user]['file_id']:
                if file in file_info:
                    file_tags = file_info[file]['tags']
                    shared_tags.update(target_tags.intersection(file_tags))  # Find common tags

                pred = model.predict(other_user, file).est
                total_score += pred
                count += 1

            if count > 0:
                avg_score = total_score / count  # Average similarity score
                tag_match_score = len(shared_tags) / max(1, len(target_tags))  # Tag similarity score
                final_score = (avg_score * 0.7) + (tag_match_score * 0.3)  # Weighted Score (70% SVD, 30% Tags)

                predictions.append((other_user, final_score))

    # Sort by score in descending order
    predictions.sort(key=lambda x: x[1], reverse=True)

    return [{"user_id": user, "score": round(score, 4)} for user, score in predictions[:n]]

# Get recommendations for the user
recommended_users = get_similar_users(user_id)

# Output JSON for NestJS
print(json.dumps({"recommended_users": recommended_users}))
