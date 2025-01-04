'use client'

import React, { Dispatch, SetStateAction } from 'react'
import EngagementCard from "./EngagementCard";
import { EngagementWithSpeakers, EngagementWithStatus } from "@/lib/types";

const isInCurrentMonth = (date: Date, currentDate: Date) => {
    return date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear();
}

interface ListViewProps {
    engagements: (EngagementWithSpeakers | EngagementWithStatus)[];
    setEngagements: Dispatch<SetStateAction<(EngagementWithSpeakers | EngagementWithStatus)[]>>;
    currentDate: Date;
}

export default function ListView({ engagements, setEngagements, currentDate }: ListViewProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {engagements.map(engagement => {
                const setEngagement = (engagement: EngagementWithSpeakers | EngagementWithStatus) => {
                    setEngagements(engagements => {
                        const index = engagements.findIndex(e => e.id === engagement.id);
                        if (index === -1) {
                            return engagements;
                        }
                        const newEngagements = [...engagements];
                        newEngagements[index] = engagement;
                        return newEngagements;
                    });
                }
                return (
                isInCurrentMonth(new Date(engagement.start), currentDate) &&
                <EngagementCard 
                    key={engagement.id} 
                    engagement={engagement} 
                    setEngagement={setEngagement}
                />
            )})}
            {engagements.filter(engagement => isInCurrentMonth(new Date(engagement.start), currentDate)).length === 0 && (
                <div className="text-center w-full text-xl col-span-4">
                    <p>No events in this month</p>
                </div>
            )}
        </div>
    )
}