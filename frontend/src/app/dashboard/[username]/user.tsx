import React from 'react'
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function User() {
  const params = useParams();
  const router = useRouter();

  const username = params?.username ? String(params.username) : "";

  useEffect(() => {
    if (!username) return; // Avoid running the effect if username is empty

    const storedUsername = localStorage.getItem("username");
    const decodedUsername = decodeURIComponent(username);

    if (!storedUsername || storedUsername !== decodedUsername) {
      router.push("/auth/login");
    }
  }, [username]);


  return (
    <div className="relative w-screen h-[50vh] sm:h-[400px] overflow-hidden">
      <h1>Welcome, {decodeURIComponent(username)}!</h1>
    </div>
  );
}