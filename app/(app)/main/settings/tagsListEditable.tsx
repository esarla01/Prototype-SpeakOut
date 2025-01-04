import React, { useState } from "react";
import TagInput from "./TagListInput"; // Ensure the import is correct based on your file structure

interface Props {
  tags: string[];
}

export default function EditableTagsList({ tags }: Props) {
  const [tagsList, setTagsList] = useState<string[]>(tags || []);
  const [isVisible, setIsVisible] = useState(false); // State to control visibility of the tag input

  const handleSetTags = (newTagNames: string[]) => {
    setTagsList(tagsList => ([...tagsList, ...newTagNames]));
  };

  const addTag = async (tagName: string) => {
    try {
      const response = await fetch("/api/tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: tagName }),
      });
      if (!response.ok) throw new Error("Failed to add tag");
      // Optionally, update the tag list locally if needed
    } catch (error) {
      console.error("Error adding tag:", error);
    }
  };

  const deleteTag = async (tagName: string) => {
    try {
      const response = await fetch(
        `/api/tags?tag=${encodeURIComponent(tagName)}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete tag");
      // Optionally, update the tag list locally if needed
    } catch (error) {
      console.error("Error deleting tag:", error);
    }
  };

  // Toggle the visibility of the TagInput component
  const toggleTagInputVisibility = () => {
    setIsVisible(!isVisible);
    if (isVisible == true) window.location.reload();
  };

  return (
    <>
      <div className="mt-3 mb-3 flex bg-white flex-wrap border border-black w-full rounded-xl px-2 py-2 focus:outline-none focus:border-[#7481D6]">
        <TagInput
          tags={tagsList}
          setTags={handleSetTags}
          addTag={addTag}
          deleteTag={deleteTag}
        />
      </div>
    </>
  );
}
