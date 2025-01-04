import { EngagementWithSpeakers } from "@/lib/types";
import { use, useState } from "react";
import TagInput from "@/components/FormInput/TagInput";
import React from "react";
import { useOutsideClick } from "@/lib/hooks";

interface FilterBarProps {
    engagementQuery: string;
    setEngagementQuery: (query: string) => void;
    tags: string[];
    setTags: (tags: string[]) => void;
    engagements: EngagementWithSpeakers[];
    filteredEngagements: EngagementWithSpeakers[];
}

export default function FilterBar({ engagementQuery, setEngagementQuery, tags, setTags, engagements, filteredEngagements }: FilterBarProps) {
    const [showDropdown, setShowDropdown] = useState(false);
    const ref = React.useRef(null);
    useOutsideClick(ref, () => setShowDropdown(false));

    return (
        <div className="flex flex-row space-x-2 bg-white rounded p-2 my-2 border-black border">
            <div>
                <label className="text-xs text-[#555] block"> Engagements </label>
                <div ref={ref}>
                    <input
                        type="text"
                        onClick={() => setShowDropdown(!showDropdown)}
                        placeholder="All Engagements"
                        value={engagementQuery}
                        onChange={(e) => {
                            setEngagementQuery(e.target.value),
                                setShowDropdown(true),
                                setTags([]);
                        }}
                        className="p-1 border border-[#ccc] rounded focus:outline-none focus:border-[#7481D6]"
                        list="engagements-list"
                    />
                    {showDropdown && (
                        <div className="bg-white rounded shadow-lg z-10 absolute top-[290px]">
                            {filteredEngagements.map((engagement) => (
                                <div
                                    key={engagement.id}
                                    className="p-2 cursor-pointer hover:bg-[#e5e7eb]"
                                    onClick={() => {
                                        setEngagementQuery(engagement.title);
                                        setShowDropdown(false);
                                    }}
                                >
                                    {engagement.title}
                                </div>
                            ))}
                            {!engagementQuery &&
                                engagements.map((engagement) => (
                                    <div
                                        key={engagement.id}
                                        className="p-2 cursor-pointer hover:bg-[#e5e7eb]"
                                        onClick={() => {
                                            setEngagementQuery(engagement.title);
                                            setShowDropdown(false);
                                        }}
                                    >
                                        {engagement.title}
                                    </div>
                                ))}
                        </div>
                    )}
                </div>

            </div>

            <div className="w-full">
                <label className="text-xs text-[#555] block"> Tags </label>
                <TagInput
                    tags={tags}
                    setTags={(tags: string[]) => {
                        setTags(tags)
                    }}
                    classes="w-full border-[#ccc] rounded"
                />
            </div>
        </div>
    )
}