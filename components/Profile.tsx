import React from "react";
import PromptCard from "./PromptCard";
import { Prompt } from "./Feed";

const Profile = ({ name, desc, data, handleEdit, handleDelete }: any) => {
  const handleTagClick = (tag: string) => {
    console.log("tag", tag);
  };

  return (
    <>
      <section className="w-full">
        <h1 className="head_text text_left ">
          <span className="blue_gradient">{name}</span> Profile{" "}
        </h1>

        <p className="text-gray-500 mt-2 text-left">{desc}</p>

        <div className="mt-16 prompt_layout">
          {data.map((post: Prompt) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Profile;
