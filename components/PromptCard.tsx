"use client";

import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AiOutlineCopy } from "react-icons/ai";
const PromptCard = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}: any) => {
  const [copied, setCopied] = useState<String>();
  const { data: session } = useSession();
  const router = useRouter();

  const handleCopy = () => {
    navigator.clipboard.writeText(post.prompt);
    setCopied(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  const handleUsernameClick = () => {
    router.push(`/profile`);
  };

  return (
    <div className="prompt_card ">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image src={post.userId.image} width={40} height={40} alt="profile" />
          <div className="flex flex-col">
            <p
              onClick={handleUsernameClick}
              className="font-semibold font-satoshi text-gray-900  cursor-pointer"
            >
              {post.userId.username}
            </p>
            <p className="text-sm font-inter text-gray-500">
              {post.userId.email}
            </p>
          </div>
        </div>
        <div className="bopy_btn " onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={20}
            height={20}
            alt="copy"
          />
        </div>
      </div>
      <p className="my-4  font-satoshi text-sm text-gray-700 ">{post.prompt}</p>
      <span
        className="text-gray-500 text-sm blue_gradient  cursor-pointer "
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </span>
    </div>
  );
};

export default PromptCard;
