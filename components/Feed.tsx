"use client";

import React from "react";
import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

type user = {
  email: string;
  username: string;
  image: string;
  _id: string;
};
type Prompt = {
  prompt: string;
  tag: string;
  _id: string;
  userId: user;
};

const PromptCardList = ({ data, handleTagClick }: any) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((prompt: Prompt) => (
        <PromptCard
          key={prompt._id}
          post={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};
const Feed = () => {
  const [searchText, setSearchText] = useState();
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    // Fetch all prompts
    const fetchprompts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      // console.log("prompts", data);
      setPrompts(data);
    };

    fetchprompts();
  }, []);

  const handleSearchChange = () => {};

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer "
        />
      </form>
      <PromptCardList data={prompts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
