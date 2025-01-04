"use client";
import React, { useState } from "react";
import PendingSpeakerCard from "@/components/EngagementPopup/PendingSpeakerCard";
import SpeakerCard from "./SpeakerCardEventDetails";
import { EngagementWithSpeakers, UserNoPassword } from "@/lib/types";
import AdminEngagementEditForm from "./AdminEngagementEditForm";
import { EmailSpeakers } from "../EmailSpeakers";
import { EngagementSchema } from "@/lib/schema";
import "react-datepicker/dist/react-datepicker.css";
import { Alert } from "../Alert";
import Button from "../Button";
import { AiOutlinePlus } from "react-icons/ai";
import SpeakerInput from "../FormInput/SpeakerInput";
import { AdminSpeakerEngagementHistory } from "./AdminSpeakerEngagementHistory";

export interface AdminEngagementEditProps {
  engagementData: EngagementWithSpeakers;
  setEngagementData: (engagement: EngagementWithSpeakers) => void;
  toggleEditMode: () => void;
}

export function AdminEngagementEdit({
  engagementData,
  setEngagementData,
  toggleEditMode,
  activeTab,
  setActiveTab,
}: AdminEngagementEditProps & {
  activeTab: string; // Active tab state
  setActiveTab: (tab: string) => void; // Function to set active tab
}) {
  const [
    confirmedSpeakersEmailPopupVisible,
    setConfirmedSpeakersEmailPopupVisible,
  ] = useState(false);
  const [
    pendingSpeakersEmailPopupVisible,
    setPendingSpeakersEmailPopupVisible,
  ] = useState(false);
  const [engagement, setEngagement] =
    useState<EngagementWithSpeakers>(engagementData);
  const [error, setError] = useState<string>("");

  const saveChanges = async () => {
    const validationResult = EngagementSchema.safeParse(engagement);
    if (!validationResult.success) {
      setError(validationResult.error.errors[0].message);
      return;
    }
    const res = await fetch(`/api/engagements?id=${engagement.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...engagement,
        start: new Date(engagement.start),
        end: new Date(engagement.end),
      }),
    });

    if (res.ok) {
      const updatedEngagement = await res.json();
      setEngagementData({
        ...updatedEngagement,
        start: new Date(updatedEngagement.start),
        end: new Date(updatedEngagement.end),
      });

      // Check for newly confirmed speakers
      const newConfirmedSpeakers = updatedEngagement.confirmedSpeakers.filter(
        (speaker: UserNoPassword) =>
          !engagementData.confirmedSpeakers.some(
            (prevSpeaker) => prevSpeaker.email === speaker.email
          )
      );

      // Create notifications for new speakers
      newConfirmedSpeakers.forEach(async (speaker: UserNoPassword) => {
        const title = `${speaker.firstname} ${speaker.lastname} was confirmed for ${engagement.title}`;

        const response = await fetch("/api/engagementNotif", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            engagementId: engagement.id,
            title: title,
            userId: speaker.id,
          }),
        });
      });

      toggleEditMode();
    } else {
      console.log("ERROR SAVING", res);
    }
  };

  const confirmSpeaker = async (speaker: UserNoPassword) => {
    if (engagement.confirmedSpeakers.length >= engagement.capacity) {
      return;
    } else {
      setEngagement((engagement) => ({
        ...engagement,
        confirmedSpeakers: [...engagement.confirmedSpeakers, speaker],
        pendingSpeakers: engagement.pendingSpeakers.filter(
          (pendingSpeaker) => pendingSpeaker.id !== speaker.id
        ),
      }));
    }
  };

  const rejectSpeaker = async (speaker: any) => {
    setEngagement((engagement) => ({
      ...engagement,
      confirmedSpeakers: engagement.confirmedSpeakers.filter(
        (confirmedSpeaker) => confirmedSpeaker.id !== speaker.id
      ),
      pendingSpeakers: engagement.pendingSpeakers.filter(
        (pendingSpeaker) => pendingSpeaker.id !== speaker.id
      ),
      rejectedSpeakers: [...engagement.rejectedSpeakers, speaker],
    }));
  };

  const [addingSpeaker, setAddingSpeaker] = useState(false);

  return (
    <div>
      <div className="grid grid-cols-2 mt-4">
        <button
          className={`flex justify-center w-full text-[#380D5A] font-large py-3 hover:bg-[#d3d3d3] bg-white rounded-lg ${
            activeTab === "details" ? "bg-gray-200" : ""
          }`}
          onClick={() => setActiveTab("details")}
        >
          Event Details
        </button>
        <button
          className={`flex justify-center w-full text-[#380D5A] font-large py-3 hover:bg-[#d3d3d3] bg-white rounded-lg ${
            activeTab === "speakers" ? "bg-gray-200" : ""
          }`}
          onClick={() => setActiveTab("speakers")}
        >
          Speakers
        </button>
      </div>
      <hr className="color-primarydarkblue" />
      {activeTab == "details" ? (
        <AdminEngagementEditForm
          formData={engagement}
          setFormData={setEngagement}
        />
      ) : (
        <div>
          <div className="grid lg:grid-cols-2 lg:gap-2 xs:grid-cols-1 my-2">
            <div>
              <span className="text-[20px] text-[#380D5A] font-medium font-serif mb-3">
                Speakers ({engagement.confirmedSpeakers.length}/
                {engagement.capacity}){" "}
                <span className="text-[16px]">
                  {/* <Button variant="secondary" onClick={() => { setConfirmedSpeakersEmailPopupVisible(true) }}>Email Confirmed Speakers</Button> */}
                </span>{" "}
              </span>
              <div className="border border-black flex flex-wrap w-full rounded-xl px-2 py-3 mt-2 mb-8 items-center">
                {addingSpeaker ? (
                  <SpeakerInput
                    speakers={engagement.confirmedSpeakers}
                    pendingSpeakers={engagement.pendingSpeakers}
                    setSpeakers={(speakers: UserNoPassword[]) =>
                      setEngagement((engagement) => ({
                        ...engagement,
                        confirmedSpeakers: speakers,
                      }))
                    }
                    useDropdown={true}
                    maxSpeakers={engagement.capacity}
                  />
                ) : (
                  <>
                    {engagement.confirmedSpeakers.map((speaker, index) => (
                      <div key={index} className="m-1">
                        <SpeakerCard
                          speaker={speaker}
                          isAdminMode={true}
                          onDelete={() => rejectSpeaker(speaker)}
                        />
                      </div>
                    ))}
                    {engagement.confirmedSpeakers.length >=
                    engagement.capacity ? (
                      <div></div>
                    ) : (
                      <Button
                        variant="outline-blue"
                        className="flex flex-row items-center my-2 ml-2"
                        onClick={() => setAddingSpeaker(true)}
                        disabled={
                          engagement.confirmedSpeakers.length >=
                          engagement.capacity
                        }
                      >
                        Add Speaker
                        <AiOutlinePlus className="pl-1 text-xl" />
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>

            <div>
              <div>
                <span className="text-[20px] text-[#380D5A] font-medium font-serif mb-3">
                  Pending Speakers{" "}
                </span>
                {/* <Button variant="secondary" onClick={() => { setPendingSpeakersEmailPopupVisible(true)}}>Email Pending Speakers</Button> */}
              </div>
              <div className="border border-black flex flex-wrap w-full rounded-xl px-2 py-3 mt-2">
                {engagement.pendingSpeakers.map((speaker, index) => (
                  <div key={index} className="m-1">
                    <PendingSpeakerCard
                      speaker={speaker}
                      isAdminMode={true}
                      onDelete={() => rejectSpeaker(speaker)}
                      onConfirm={() => confirmSpeaker(speaker)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <AdminSpeakerEngagementHistory engagement={engagement} />
        </div>
      )}

      {error && <Alert>{error}</Alert>}
      <div className="flex flex-row justify-end">
        <Button variant="secondary" onClick={saveChanges}>
          Save
        </Button>
      </div>

      {confirmedSpeakersEmailPopupVisible && (
        <EmailSpeakers
          users={engagement.confirmedSpeakers}
          onClose={() => setConfirmedSpeakersEmailPopupVisible(false)}
        />
      )}
      {pendingSpeakersEmailPopupVisible && (
        <EmailSpeakers
          users={engagement.pendingSpeakers}
          onClose={() => setPendingSpeakersEmailPopupVisible(false)}
        />
      )}
    </div>
  );
}
