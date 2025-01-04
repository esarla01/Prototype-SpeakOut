"use client";

import SpeakerCard from "@/app/(app)/main/speakers/SpeakerCard";
import React, { useState, useEffect } from "react";
import { EmailSpeakers } from "@/components/EmailSpeakers";
import { UserNoPassword, EngagementWithSpeakers } from "@/lib/types";
import InviteSpeakersPopup from "./InviteSpeakersPopup";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import FilterBar from "./FilterBar";

export default function SpeakerView({
  users,
  engagements,
}: {
  users: UserNoPassword[];
  engagements: EngagementWithSpeakers[];
}) {
  const [selectedUsers, setSelectedUsers] = useState<UserNoPassword[]>([]);
  const [isEmailPopupVisible, setEmailPopupVisible] = useState(false);
  const [isInvitePopupVisible, setInvitePopupVisible] = useState(false);
  const [engagementQuery, setEngagementQuery] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (selectedUsers.length < users.length) {
      setSelectedUsers(users);
    } else {
      setSelectedUsers([]);
    }
  };

  const handleUserSelection = (user: UserNoPassword) => {
    if (selectedUsers.includes(user)) {
      setSelectedUsers((prevSelected) =>
        prevSelected.filter((prevUser) => prevUser.id !== user.id)
      );
    } else {
      setSelectedUsers((prevSelected) => [...prevSelected, user]);
    }
  };

  const handleDeleteUsers = async () => {
    try {
      if (selectedUsers.length === 0) {
        return;
      }
      const isConfirmed = window.confirm(
        "Are you sure you want to delete the selected users?"
      );
      if (isConfirmed) {
        selectedUsers.map((user) =>
          fetch(`/api/users?id=${user.id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              if (!response.ok) {
                alert(`Failed to delete user with ID ${user.id}`);
              }
              return response.json();
            })
            .catch((error) => {
              console.error(error.message);
            })
        );
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting users:", error);
    }
  };

  // Filtering engagements based on search query for engagements
  const filteredEngagements =
    engagementQuery.trim() !== ""
      ? engagements
        ? engagements.filter((engagement) =>
          engagement.title
            .toLowerCase()
            .includes(engagementQuery.toLowerCase())
        )
        : []
      : [];

  const filteredSpeakers = users.filter((user) => {
    for (let tag of tags) {
      if (!user.tags.includes(tag)) {
        return false;
      }
    }
    return true;
  })
  const filteredConfirmedSpeakers = filteredSpeakers.filter((user) => {
    for (let engagement of filteredEngagements) {
      if (engagement.confirmedSpeakers.map(user => user.id).includes(user.id)) {
        return true;
      }
    }
  })
  const filteredPendingSpeakers = filteredSpeakers.filter((user) => {
    for (let engagement of filteredEngagements) {
      if (engagement.pendingSpeakers.map(user => user.id).includes(user.id)) {
        return true;
      }
    }
  })

  return (
    <>
      <div>
        <div className="flex flex-col md:flex-row md:justify-between">
          <Typography variant="h1">Speakers</Typography>
          <span className="flex flex-row flex-wrap justify-between space-x-2">
            <div>
              <Button
                variant="outline-white"
                onClick={() => setEmailPopupVisible(true)}
                disabled={selectedUsers.length === 0}
              >
                Email
              </Button>
            </div>
            <div>
              <Button variant="outline-white" onClick={toggleSelectAll}>
                {selectedUsers.length == users.length ? "Deselect All" : "Select All"}
              </Button>
            </div>
            <div>
              <Button variant="outline-white" onClick={handleDeleteUsers}>
                Delete User
              </Button>
            </div>
            <div>
              <Button
                variant="outline-white"
                onClick={() => setInvitePopupVisible(true)}
              >
                Invite Users
              </Button>
            </div>
          </span>
        </div>
        <span className="text-lg text-black font-medium">
          {users.length} Speakers
        </span>
      </div>

      <FilterBar
        engagementQuery={engagementQuery}
        setEngagementQuery={setEngagementQuery}
        tags={tags}
        setTags={setTags}
        engagements={engagements}
        filteredEngagements={filteredEngagements}
      />

      <div className="w-full grid grid-cols-6 space-x-3">
        <div className="lg:col-span-6 col-span-6 space-y-3">
          {engagementQuery.length > 0 ? (
            <>
              <p>Confirmed Speakers: </p>
              {!!filteredConfirmedSpeakers ?
                <>
                  {
                    filteredConfirmedSpeakers.map((user) => (
                      <SpeakerCard
                        key={user.id}
                        speaker={user}
                        isSelected={selectedUsers.includes(user)}
                        onSelect={() => handleUserSelection(user)}
                      />
                    ))
                  }
                </>
                :
                <p> No pending speakers. </p>}
              <p>Pending Speakers:</p>
              {!!filteredPendingSpeakers ?
                <>
                  {
                    filteredPendingSpeakers.map((user) => (
                      <SpeakerCard
                        key={user.id}
                        speaker={user}
                        isSelected={selectedUsers.includes(user)}
                        onSelect={() => handleUserSelection(user)}
                      />
                    ))
                  }
                </>
                :
                <p> No pending speakers. </p>}
            </>
          ) : (
            <>
              {!!filteredSpeakers ?
                <>
                  {
                    filteredSpeakers.map((user) => (
                      <SpeakerCard
                        key={user.id}
                        speaker={user}
                        isSelected={selectedUsers.includes(user)}
                        onSelect={() => handleUserSelection(user)}
                      />
                    ))
                  }
                </>
                :
                <p> No pending speakers. </p>}
            </>
          )}
        </div>
      </div >
      {isEmailPopupVisible && (
        <EmailSpeakers users={selectedUsers} onClose={() => setEmailPopupVisible(true)} />
      )
      }
      {
        isInvitePopupVisible && (
          <InviteSpeakersPopup onClose={() => setInvitePopupVisible(false)} />
        )
      }
    </>
  );
}
