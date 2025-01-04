import IdentityTag from '@/components/IdentityTag';
import React, { useState } from 'react';

const ENTER = 13;
const COMMA = 188;
const BACKSPACE = 8;


export default function TagInput({
  tags,
  setTags,
  addTag, // Function to handle adding a tag to the backend
  deleteTag // Function to handle deleting a tag from the backend
}: {
  tags: string[],
  setTags: (tags: string[]) => void,
  addTag: (tag: string) => void,
  deleteTag: (tag: string) => void
}) {
  const [value, setValue] = useState("");

  const handleKeyUp = (e: { keyCode: any; }) => {
    const key = e.keyCode;
    if (key === ENTER || key === COMMA) {
      const trimmedValue = value.trim().replace(/,/g, "");
      if (trimmedValue && !tags.includes(trimmedValue)) {
        // Update local state and also try to add the tag to the backend
        addTagInternal(trimmedValue); // This updates local state
        addTag(trimmedValue); // This makes the API call
        setValue("");
      }
    }
  };

  const handleKeyDown = (e: { keyCode: any; }) => {
    const key = e.keyCode;
    if (key === BACKSPACE && !value) {
      if (tags.length > 0) {
        const lastTag = tags[tags.length - 1];
        deleteTag(lastTag); // Call deleteTag before editing the last tag
        editLastTag();
      }
    }
  };

  // Function to update local state with the new tag
  const addTagInternal = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (index: number) => {
    const tagToRemove = tags[index];
    deleteTag(tagToRemove); // Call deleteTag when a tag 'x' is clicked
    setTags(tags.filter((_, idx) => idx !== index));
  };

  const editLastTag = () => {
    const newTags = [...tags];
    setValue(newTags.pop() || "");
    setTags(newTags);
  };

  return (
    <>
      {tags.map((tag, index) => (
        <IdentityTag
          key={index}
          label={tag}
          onDelete={() => removeTag(index)}
        />
      ))}
      <input
        type="text"
        placeholder="Add tag..."
        className="inline-block w-[100px] p-1 rounded"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
      />
    </>
  );
}
