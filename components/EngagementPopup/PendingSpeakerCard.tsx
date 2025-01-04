import { UserNoPassword } from '@/lib/types';
import { User } from '@prisma/client';
import Image from 'next/image';
import React, { useState } from 'react';
import { AiOutlineDown } from "react-icons/ai";

interface Props {
    speaker: UserNoPassword;
    isAdminMode: boolean;
    onDelete: () => void;
    onConfirm: () => void;
}

export default function PendingSpeakerCard({ speaker, isAdminMode, onDelete, onConfirm }: Props) {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };

    const handleDeleteClick = () => {
        setShowDropdown(false)
        onDelete();
    };

    const handleConfirmClick = () => {
        setShowDropdown(false);
        onConfirm();
    };

    return (
        <div className="relative">
            <div className="bg-white border border-[#1E2A78] border-1 pl-3 pr-3 py-1.5 rounded-3xl text-black text-sm font-sans font-medium flex flex-row">
                <div className="w-[50px] h-[50px] rounded-full overflow-hidden min-w-[50px]">
                    <Image 
                        src={speaker.image} 
                        alt="Profile" 
                        className="h-full w-full" 
                        width={100}
                        height={100}
                    />
                </div>

                <div className="ml-1">
                    <span className="text-[#1E2A78] text-xl font-sans font-medium">
                        {`${speaker.firstname} ${speaker.lastname}`}
                    </span>
                    <br />
                    <span className="text-[#1E2A78] text-sm font-sans font-medium">
                        {speaker.pronouns}
                    </span>
                </div>

                {isAdminMode && (
                    <div className="ml-2">
                        {showDropdown ? (
                            <div className="flex flex-col">
                                <button
                                    onClick={handleConfirmClick}
                                    className="text-[#4d7c0f] text-base font-medium hover:bg-[#e5e7eb] focus:bg-[#e5e7eb] rounded px-2 mr-1"
                                >
                                    Confirm
                                </button>
                                <button
                                    onClick={handleDeleteClick}
                                    className="text-[#be123c] text-base font-medium hover:bg-[#e5e7eb] focus:bg-[#e5e7eb] rounded px-2 mr-1"
                                >
                                    Deny
                                </button>
                            </div>
                        ) : (
                            <button className="mt-3 ml-2" onClick={handleDropdownToggle}>
                                <AiOutlineDown className="text-[#1E2A78] text-2xl" />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}