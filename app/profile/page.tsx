"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Profile from "@/components/Profile";

const ProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  const handleEdit = async () => {};
  const handleDelete = async () => {};

  useEffect(() => {
    // Fetch all prompts
    const fetchprompts = async () => {
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await response.json();
      // console.log("prompts", data);
      setPosts(data);
    };

    if (session?.user?.id) fetchprompts();
  }, []);

  return (
    <Profile
      name="My"
      desc="Welcome to your profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;