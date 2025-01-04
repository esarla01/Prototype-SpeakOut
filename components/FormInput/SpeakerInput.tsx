"use client";
import React, { useState, useEffect, useRef } from "react";
import SpeakerCard from "../EngagementPopup/SpeakerCardEventDetails";
import { useOutsideClick } from "@/lib/hooks";
import { UserNoPassword } from "@/lib/types";

const ENTER = 13;
const COMMA = 188;
const BACKSPACE = 8;

interface SpeakerInputProps {
  speakers: UserNoPassword[];
  pendingSpeakers: UserNoPassword[];
  setSpeakers: (speakers: UserNoPassword[]) => void;
  useDropdown?: boolean;
  maxSpeakers: number;
}

export default function SpeakerInput({
  speakers,
  pendingSpeakers,
  setSpeakers,
  useDropdown = true,
  maxSpeakers,
}: SpeakerInputProps) {
  const [value, setValue] = useState("");
  const [allSpeakers, setAllSpeakers] = useState<UserNoPassword[]>(speakers);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => setShowDropdown(false));

  useEffect(() => {
    async function fetchSpeakers() {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) {
          throw new Error(`Failed to fetch speakers, status: ${res.status}`);
        }
        const data = await res.json();
        setAllSpeakers(data);
      } catch (error) {
        console.error("Fetching speakers failed:", error);
        setAllSpeakers([]);
      }
    }
    fetchSpeakers();
  }, []);

  const handleKeyUp = (e: { keyCode: number }) => {
    if ((e.keyCode === ENTER || e.keyCode === COMMA) && showDropdown) {
      setShowDropdown(false); // Close dropdown on selecting
    }
  };

  const editLastSpeaker = () => {
    if (speakers.length > 0) {
      const newSpeakers = speakers.slice(0, speakers.length - 1);
      setSpeakers(newSpeakers); // Update state
    }
  };

  const handleKeyDown = (e: { keyCode: number }) => {
    if (e.keyCode === BACKSPACE && !value && speakers.length > 0) {
      editLastSpeaker();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (speakers.length >= maxSpeakers) {
      setShowDropdown(false);
      return;
    }
    setValue(e.target.value);
    setShowDropdown(true);
  };

  const selectTag = (speaker: UserNoPassword) => {
    if (speakers.length >= maxSpeakers) {
      setShowDropdown(false);
    } else if (!speakers.includes(speaker)) {
      setSpeakers([...speakers, speaker]);
    }
    setValue("");
  };

  let filterSpeakers = allSpeakers.filter(
    (speaker) =>
      !speakers.some((chosenSpeaker) => chosenSpeaker.id === speaker.id) &&
      !pendingSpeakers.some(
        (pendingSpeaker) => pendingSpeaker.id === speaker.id
      )
  );
  filterSpeakers =
    value.length === 0
      ? filterSpeakers
      : filterSpeakers.filter((speaker) =>
          (speaker.firstname + " " + speaker.lastname)
            .toLowerCase()
            .includes(value.toLowerCase())
        );

  return (
    <div
      className="w-full bg-white flex flex-wrap items-center"
      ref={wrapperRef}
    >
      {speakers.map((speaker, index) => (
        <SpeakerCard
          key={index}
          speaker={speaker}
          isAdminMode={true}
          onDelete={() => setSpeakers(speakers.filter((_, i) => i !== index))}
        />
      ))}
      {speakers.length < maxSpeakers && (
        <div
          className="inline-block m-1"
          onClick={() => setShowDropdown((showDropdown) => !showDropdown)}
        >
          <input
            type="text"
            placeholder="Add speaker..."
            className="inline-block w-[200px] p-1 border border-black rounded-xl focus:outline-none focus:border-[#7481D6]"
            value={value}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
            onKeyDown={handleKeyDown}
          />
          {useDropdown && showDropdown && (
            <ul className="absolute bg-white rounded border border-gray-300 mt-1 w-[200px] max-h-40 overflow-auto z-10 text-left">
              {filterSpeakers.map((speaker) => (
                <li
                  key={speaker.email} // Using email as unique key
                  onClick={() => selectTag(speaker)}
                  className="p-2 hover:bg-[#eee] cursor-pointer"
                >
                  {speaker.firstname} {speaker.lastname}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
