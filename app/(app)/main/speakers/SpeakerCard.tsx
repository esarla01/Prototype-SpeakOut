'use client'

import React, { useState } from 'react';
import Avatar from '@/components/Avatar';
import { EmailSpeakers } from '@/components/EmailSpeakers';
import { UserNoPassword } from '@/lib/types';
import Link from 'next/link';

interface SpeakerCardProps {
  speaker: UserNoPassword
  isSelected: boolean
  onSelect: () => void
}

export default function SpeakerCard({ speaker, isSelected, onSelect }: SpeakerCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEmailPopupVisible, setEmailPopupVisible] = useState(false);

  const handleEmailButtonClick = () => {
    setEmailPopupVisible(true);
  };

  const handleCloseEmailPopup = () => {
    setEmailPopupVisible(false);
  };

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onSelect}
        className="mr-5 h-6 w-6"
      />
      <div 
        className="text-base px-4 py-2 bg-white border-black border w-full rounded-[15px] container grid grid-cols-10 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="col-span-1 hidden xl:block">
          <Avatar image={!!speaker.image? speaker.image : "/images/SpeakOUTLogo.svg"} />
        </div>
        <div className="lg:col-span-3 col-span-6 overflow-hidden">
          <div className="text-secondary2 text-left mr-2 text-xl">{speaker.firstname} {speaker.lastname}</div>
          <div className="text-left">{speaker.pronouns}</div>
        </div>
        <div className='lg:col-span-5 hidden lg:flex flex-col justify-center overflow-hidden'>
          <div>{speaker.email}</div>
        </div>
        <div 
          className='lg:col-span-1 col-span-2 flex flex-col justify-center'
        >
          <svg
            className={`w-3 ${isOpen ? 'rotate-180' : ''}`}
            aria-hidden="true"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </div>

        {isOpen && (
          <div className="col-span-10 flex justify-end w-full">
            <Link href={`/main/profile/${speaker.id}`}>
              <button
                type="button"
                className="text-sm border border-solid border-black text-black font-bold py-1 px-6 rounded-full bg-[#F0F0F0] hover:bg-[#d1d5db]"
              >
                Profile
              </button>
            </Link>
            <button
              type="button"
              className="ml-2 text-sm border border-solid bg-[#F0F0F0] border-black text-black font-bold py-1 px-6 rounded-full hover:bg-[#d1d5db]"
              onClick={handleEmailButtonClick}
            >
              Email
            </button>
          </div>
        )}
        {isEmailPopupVisible && (
          <EmailSpeakers
            users={[speaker]}
            onClose={handleCloseEmailPopup}
          />
        )}
      </div>
    </div>
  );
}