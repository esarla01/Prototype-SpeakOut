"use client";

import Typography from "@/components/Typography";
import { IoMdTime } from "react-icons/io";
import { FaRegDotCircle } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import SpeakerCard from "./SpeakerCardEventDetails";
import IdentityTag from "../IdentityTag";
import { EngagementWithSpeakers } from "@/lib/types";
import { dateToAMPM } from "@/lib/utils";
import { MdOutlineEditNote } from "react-icons/md";
import { IoCalendarClearOutline, IoPeopleSharp } from "react-icons/io5";
import Link from "next/link";
import Button from "../Button";
import EditIcon from "../icons/EditIcon";
import { useState } from "react";
import { AdminSpeakerEngagementHistory } from "./AdminSpeakerEngagementHistory";

export function AdminEngagementView({
  engagement,
  toggleEditMode,
  activeTab,
  setActiveTab,
}: {
  engagement: EngagementWithSpeakers;
  toggleEditMode: () => void;
  activeTab: string; // Active tab state
  setActiveTab: (tab: string) => void; // Function to set active tab
}) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 mt-4">
        <button
          className="flex justify-center w-full text-[#380D5A] font-large py-3 hover:bg-[#d3d3d3] bg-white rounded-lg"
          onClick={() => setActiveTab("details")}
        >
          <span className={activeTab == "details" ? "font-bold underline" : ""}>
            Event Details
          </span>
        </button>
        <button
          className="flex justify-center w-full text-[#380D5A] font-large py-3 hover:bg-[#d3d3d3] bg-white rounded-lg"
          onClick={() => setActiveTab("speakers")}
        >
          <span className={activeTab == "speakers" ? "font-bold underline" : ""}>
            Speakers
          </span>
        </button>
      </div>
      <hr className="color-primarydarkblue" />

      {activeTab == "details" ? (
        <div>
          <div className="text-[#380D5A] font-medium">
            <Typography variant="h2">{engagement.title}</Typography>
            <div className="flex flex-row items-center mb-2 text-sm font-sans text-[#11173D] space-x-2">
              <span className="flex flex-row">
                <GoLocation className="pr-1 text-xl" />
                <Link
                  className="text-blue-500 underline"
                  href={`https://www.google.com/maps/search/?api=1&query=${engagement.address}`}
                  target="_blank"
                >
                  {engagement.sitename}
                </Link>
              </span>
              <span className="flex flex-row">
                <IoCalendarClearOutline className="pr-1 text-xl" />
                {new Date(engagement.start).toDateString()}
              </span>
              <span className="flex flex-row">
                <IoMdTime className="pr-1 text-xl" />
                {dateToAMPM(new Date(engagement.start))} -{" "}
                {dateToAMPM(new Date(engagement.end))}
              </span>
              <span className="flex items-center">
                <FaRegDotCircle className="pr-1 text-xl" />
                {engagement.status}
              </span>
              <span className="flex items-center">
                <IoPeopleSharp className="pr-1 text-xl" />
                {engagement.capacity}
              </span>
            </div>
          </div>

          <div>
            <div>
              <span className="text-[20px] text-[#380D5A] font-medium font-serif mb-4">
                Description
              </span>
            </div>
            <div>
              <Typography variant="p1">{engagement.description}</Typography>
            </div>
          </div>

          <div>
            <div>
              <span className="text-[20px] text-[#380D5A] font-serif font-medium">
                Identity Tags
              </span>
            </div>
            <div className="flex flex-wrap rounded-xl focus:outline-none focus:border-[#7481D6] space-x-2 -ml-1">
              {engagement.tags.map((tag, index) => (
                <IdentityTag key={index} label={tag}></IdentityTag>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="grid lg:grid-cols-2 lg:gap-2 xs:grid-cols-1">
            <div>
              <span className="text-[20px] text-[#380D5A] font-medium font-serif mb-3">
                Speakers ({engagement.confirmedSpeakers.length}/
                {engagement.capacity}){" "}
              </span>
              <div className="mt-2 mb-8 flex flex-wrap">
                {engagement.confirmedSpeakers.map((speaker, index) => (
                  <div key={index} className="m-1">
                    <SpeakerCard speaker={speaker} />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div>
                <span className="text-[20px] text-[#380D5A] font-medium font-serif mb-3">
                  Pending Speakers
                </span>
              </div>
              <div className="mt-2 flex flex-wrap">
                {engagement.pendingSpeakers.map((speaker, index) => (
                  <div key={index} className="m-1">
                    <SpeakerCard speaker={speaker} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <AdminSpeakerEngagementHistory engagement={engagement} />
        </div>
      )}
      <div className="w-full flex flex-row justify-end my-4">
        <Button variant="outline-white" onClick={toggleEditMode}>
          <EditIcon />
          Edit
        </Button>
      </div>
    </div>
  );
}
