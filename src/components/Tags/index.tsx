import React from "react";
import jsonData from "../../data/characters.json";
import type { Character } from "../../types";
import Tag from "./Tag";
import "./styles.css";

type TagsProps = {
  selectedTags: string[];
  handleSelectedTag: (text: string) => void;
};
const data: Character[] = jsonData as Character[];

const Tags = ({
  selectedTags,
  handleSelectedTag,
}: TagsProps) => {
  const tagArray: string[] = [];
  data.map((val) => {
    return val.tags?.map((tag) => tagArray.push(tag.tag_name));
  });
  tagArray.push("My Team", "Clear All");
  const tagsArray: string[] = Array.from(new Set(tagArray));

  return (
    <div className="rootTags">
      <Tag
        selectedTags={selectedTags}
        tagArray={tagsArray}
        handleSelectedTag={handleSelectedTag}
      />
    </div>
  );
};

export default Tags;
