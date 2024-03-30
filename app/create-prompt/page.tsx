"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@/components/Form";

const CratePrompt = () => {
  const [submitting, setSubmitting] = useState(false);

  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const createprompt = async (e: any) => {
    e.preventDefault();
  };
  return (
    <>
      <Form
        type="create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createprompt}
      />
    </>
  );
};

export default CratePrompt;
