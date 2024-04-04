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
export type Prompt = {
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
  const [searchText, setSearchText] = useState<any>();
  const [prompts, setPrompts] = useState([]);
  const [filteredPrompts, setFilteredPrompts] = useState([]);

  useEffect(() => {
    // Fetch all prompts
    const fetchprompts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPrompts(data);
    };
    fetchprompts();
  }, []);

  const handleSearchChange = (value: String) => {
    let filteredData = prompts.filter((prompt: Prompt) => {
      if (
        prompt.userId.username.toLowerCase().includes(value.toLowerCase()) &&
        !value.includes("#")
      ) {
        return prompt;
      }
      if (
        prompt.tag.toLowerCase().includes(value.toLowerCase()) &&
        value.includes("#")
      ) {
        return prompt;
      }
    });

    if (filteredData.length !== 0) setFilteredPrompts(filteredData);
    setSearchText(value);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={(e) => handleSearchChange(e.target.value)}
          required
          className="search_input peer "
        />
      </form>
      <PromptCardList
        data={searchText ? filteredPrompts : prompts}
        handleTagClick={(e: any) => handleSearchChange(e)}
      />
    </section>
  );
};

export default Feed;
