'use client'

import React, { useState } from 'react';
import { AdminEngagementPopup } from '@/components/EngagementPopup/AdminEngagementPopup'
import { formatDate, dateToAMPM } from '@/lib/utils'
import { EngagementWithSpeakers, EngagementWithStatus } from '@/lib/types'
import ClockIcon from '../../../../components/icons/ClockIcon';
import SpeakerEngagementPopup from '../../../../components/EngagementPopup/SpeakerEngagementPopup';
import Image from 'next/image';

const renderTimeDate = (date: string, startTime: string, endTime: string) => {
    const getDayOfWeek = (): string => {
        const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const dateobj = new Date(date);
        const dayIndex = dateobj.getDay();
        return daysOfWeek[dayIndex];
    };
    const dayOfWeek = getDayOfWeek();

    return (
        <div className="bg-white border-black py-1 rounded-lg text-xs flex items-center">
            <span className='mr-2'> <ClockIcon /> </span>
            <span> {dayOfWeek} {date} {startTime} - {endTime} </span>
        </div>
    );
}

interface EngagementCardProps {
    engagement: EngagementWithSpeakers | EngagementWithStatus;
    setEngagement: (engagement: EngagementWithSpeakers | EngagementWithStatus) => void;
    isAdmin: boolean;
}

export function EngagementCard({ engagement, setEngagement, isAdmin }: EngagementCardProps) {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const date = formatDate(new Date(engagement.start))
    const startTime = dateToAMPM(new Date(engagement.start))
    const endTime = dateToAMPM(new Date(engagement.end))
    
    const handleViewEventClick = () => {
        setPopupOpen(true);
    };

    return (
        <div className="bg-white border-black px-4 py-2 border rounded-2xl flex items-center" >
            <span className='ml-3 mr-auto overflow-hidden'>
                <p>
                    {engagement.title} 
                </p>
                {renderTimeDate(date, startTime, endTime)}
            </span>

            {('confirmedSpeakers' in engagement) && (
                <>
                    {
                        engagement.confirmedSpeakers.length >= engagement.capacity && (
                            <div className="mx-4 w-20 text-center py-1 border rounded-full bg-primarydarkblue text-white hidden sm:block">
                                FULL
                            </div>
                        )
                    }
                    <div className="flex -space-x-2">
                        {
                            engagement.confirmedSpeakers.map((speaker) => {
                                return (
                                    <Image 
                                        key={speaker.id} 
                                        className="hidden sm:inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800" 
                                        src={speaker.image} 
                                        alt="Image Description" 
                                        width={100}
                                        height={100}
                                    />
                                )
                            }
                            )
                        }
                    </div>
                </>
            )}

            <button onClick={handleViewEventClick} className='font-sans font-medium' style={{ marginLeft: '20px', marginRight: '0%', width: '100px', textAlign: 'center', padding: '5px', border: '1px solid #747AA1', borderRadius: '20px', backgroundColor: 'white', fontSize: '12px' }}>
                View Event
            </button>

            {isPopupOpen && (
                (isAdmin && ("pendingSpeakers" in engagement)) ? (
                    <AdminEngagementPopup
                        engagement={engagement as EngagementWithSpeakers}
                        setEngagement={setEngagement}
                        onClose={() => setPopupOpen(false)}
                    />
                ) : (
                    <SpeakerEngagementPopup
                        engagement={engagement as EngagementWithStatus}
                        setEngagement={setEngagement}
                        onClose={() => setPopupOpen(false)}
                    />
                )
            )}
        </div>
    );
}