import React, { useState, useEffect, useRef } from "react";
import IdentityTag from "../IdentityTag";
import { useOutsideClick } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const ENTER = 13;
const COMMA = 188;
const BACKSPACE = 8;

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  useDropdown?: boolean;
  classes?: string;
}

export default function TagInput({
  tags,
  setTags,
  useDropdown = true,
  classes=""
}: TagInputProps) {
  const [value, setValue] = useState("");
  const [allTags, setAllTags] = useState<{ id: number; name: string }[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => setShowDropdown(false));

  useEffect(() => {
    async function fetchTags() {
      try {
        const res = await fetch("/api/tags");
        if (!res.ok) {
          throw new Error(`Failed to fetch tags, status: ${res.status}`);
        }
        const data = await res.json();
        setAllTags(data);
      } catch (error) {
        console.error("Fetching tags failed:", error);
        setAllTags([]);
      }
    }
    fetchTags();
  }, []);

  const handleKeyUp = (e: { keyCode: number }) => {
    if (e.keyCode === ENTER || e.keyCode === COMMA) {
      const trimmedValue = value.trim().replace(/,/g, "");
      if (!trimmedValue) return;
      const existingTag = allTags.find(
        (tag) => tag.name.toLowerCase() === trimmedValue.toLowerCase()
      );
      if (existingTag) {
        if (!tags.includes(existingTag.name)) {
          setTags([...tags, existingTag.name]);
          setValue("");
          setShowDropdown(false);
        }
      } else {
        if (!tags.includes(trimmedValue)) {
          setTags([...tags, trimmedValue]);
          setValue("");
          setShowDropdown(false);
        }
      }
    } else {
      setShowDropdown(true);
    }
  };

  const editLastTag = () => {
    if (tags.length > 0) {
      const newTags = tags.slice(0, tags.length - 1); // Remove the last tag from the array
      setTags(newTags); // Update state
      setValue(tags[tags.length - 1]); // Set the value of the input to the last tag for possible re-editing
    }
  };

  const handleKeyDown = (e: { keyCode: number }) => {
    if (e.keyCode === BACKSPACE && !value && tags.length > 0) {
      editLastTag();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setShowDropdown(true);
  };

  const selectTag = (tagName: string) => {
    if (!tags.includes(tagName)) {
      setTags([...tags, tagName]);
    }
    setValue("");
  };

  let filterTags = allTags.filter((tag) => !tags.includes(tag.name));
  filterTags = value.length === 0
    ? filterTags
    : filterTags.filter((tag) =>
      tag.name.toLowerCase().includes(value.toLowerCase()) && !tags.includes(tag.name)
    );

  return (
    <div className="w-full bg-white flex flex-wrap items-center" ref={wrapperRef}>
      {tags.map((tag, index) => (
        <IdentityTag
          key={index}
          label={tag}
          onDelete={() => setTags(tags.filter((_, i) => i !== index))}
        />
      ))}
      <div 
        className="inline-block "
        onClick={() => setShowDropdown(setShowDropdown => !setShowDropdown)}
      >
        <input
          type="text"
          placeholder="Add tag..."
          className={cn("inline-block w-[100px] p-1 border border-black rounded-xl focus:outline-none focus:border-[#7481D6]", classes)}
          value={value}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
        />
        {useDropdown && showDropdown && (
          <ul className="absolute bg-white rounded border border-[#d1d5db] mt-1 w-[100px] max-h-40 overflow-auto z-10 text-left">
            {filterTags.map((tag) => (
              <li
                key={tag.id}
                onClick={() => selectTag(tag.name)}
                className="p-2 hover:bg-[#eee] cursor-pointer"
              >
                {tag.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}