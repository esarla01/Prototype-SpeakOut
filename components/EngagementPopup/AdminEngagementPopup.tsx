// This is the component that handles the toggling between the Admin Event Popup 
// when it is editable and non-editable. 
// Created by Benji and Riddhi -- Touched up by Aidan

'use client'
import React, { useState } from 'react';
import { AdminEngagementEdit } from './AdminEngagementEdit';
import { AdminEngagementView } from './AdminEngagementView';
import { EngagementWithSpeakers } from '@/lib/types';
import PopupModal from './PopupModal';


export function AdminEngagementPopup({ engagement, setEngagement, onClose }: { engagement: EngagementWithSpeakers, setEngagement: (engagement: EngagementWithSpeakers) => void, onClose: () => void }) {
    const [editMode, setEditMode] = useState(false);

    const toggleEditMode = () => {
        setEditMode(editMode => !editMode);
    };

    const [activeTab, setActiveTab] = useState("details");

    return (
        <div>
            <div>
                <PopupModal onClose={onClose}>
                    <div>
                    {editMode ? (
        <AdminEngagementEdit
          engagementData={engagement}
          setEngagementData={setEngagement}
          toggleEditMode={toggleEditMode}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      ) : (
        <AdminEngagementView
          engagement={engagement}
          toggleEditMode={toggleEditMode}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}
                    </div>
                </PopupModal>
            </div>
        </div>
    )
}