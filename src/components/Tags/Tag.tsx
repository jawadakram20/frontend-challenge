import React from "react";

type TagProps = {
  tagArray: string[];
  handleSelectedTag: (text: string) => void;
  selectedTags: string[];
};
const Tag = ({ tagArray, handleSelectedTag, selectedTags }: TagProps) => {
  return (
    <>
      {tagArray.map((tag, index) => {
        if (tag === "Clear All") {
          return (
            <div className="clearAll" onClick={() => handleSelectedTag(tag)}>
              {tag}
            </div>
          );
        }
        return (
          <div
            className={selectedTags.includes(tag) ? "selectedtag" : "tag"}
            key={index}
            onClick={() => handleSelectedTag(tag)}
          >
            {tag}
          </div>
        );
      })}
    </>
  );
};

export default Tag;
