"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Profile from "@/components/Profile";
import { Prompt } from "@/components/Feed";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const ProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [writer, setWriter] = useState<String>();

  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  const handleEdit = async (post: Prompt) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post: Prompt) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          const data = await response.json();
          // console.log("data", data);
          setPosts(posts.filter((p: Prompt) => p._id !== post._id));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    // Fetch all prompts
    const fetchprompts = async () => {
      // @ts-ignore
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();
      console.log("prompts", data);
      setWriter(data[0].userId.username);
      setPosts(data);
    };
    // @ts-ignore
    if (session?.user?.id) fetchprompts();
  }, []);

  return (
    <Suspense>
      <Profile
        // @ts-ignore
        name={session?.user?.id === userId ? "My" : `${writer}'s`}
        desc={
          // @ts-ignore
          session?.user?.id === userId
            ? "Welcome to your profile page"
            : `Welcome to ${writer}'s profile page`
        }
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </Suspense>
  );
};

export default ProfilePage;
