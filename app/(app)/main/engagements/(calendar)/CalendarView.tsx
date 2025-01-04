"use client"

import React, { Dispatch, SetStateAction, useState } from 'react';
import { AdminEngagementPopup } from '@/components/EngagementPopup/AdminEngagementPopup';
import { EngagementWithSpeakers, EngagementWithStatus } from '@/lib/types';
import SpeakerEngagementPopup from '@/components/EngagementPopup/SpeakerEngagementPopup';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const totalDays = 42;
const days = Array.from({ length: totalDays }, (_, i) => i + 1);

interface CalendarViewProps {
  currentDate: Date;
  engagements: (EngagementWithSpeakers | EngagementWithStatus)[];
  setEngagements: Dispatch<SetStateAction<(EngagementWithSpeakers | EngagementWithStatus)[]>>;
}

function convertEngagementsToEngagementData(engagements: (EngagementWithSpeakers | EngagementWithStatus)[]): Record<string, (EngagementWithSpeakers | EngagementWithStatus)[]> {
  const engagementData: Record<string, (EngagementWithSpeakers | EngagementWithStatus)[]> = {};
  engagements.forEach(engagement => {
    const startDate = new Date(engagement.start);
    const dateKey = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).toDateString();
    if (!engagementData[dateKey]) {
      engagementData[dateKey] = [];
    }
    engagementData[dateKey].push(engagement);
  });
  return engagementData;
}

const CalendarView = ({ currentDate, engagements, setEngagements }: CalendarViewProps) => {
  const [selectedEngagement, setSelectedEngagement] = useState<EngagementWithSpeakers | EngagementWithStatus | null>(null);

  let year = currentDate.getFullYear();
  let month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const engagementData = convertEngagementsToEngagementData(engagements);

  return (
    <>
    <div className='lg:hidden block'>
      <span className='text-xl'>Calendar is not available for this screen size</span>
    </div>
      <div className="container mx-auto lg:block hidden">
        <div className="grid grid-cols-7 bg-white">
          {daysOfWeek.map(day => (
            <div key={day} className="text-center text-white bg-primarydarkblue  p-4 text-sm xl:text-xl font-medium font-['DM Sans']">
              {day}
            </div>
          ))}
          {days.map(day => (
            <div key={day} className="border border-black rounded py-2 h-[110px] text-primarydarkblue font-bold font-['Inter'] px-2">
              <div className='text-right w-full'>
                {(day - firstDay <= daysInMonth && day > firstDay) ? day - firstDay : ' '}
              </div>
              {(new Date(currentDate.getFullYear(), currentDate.getMonth(), day - firstDay)).toDateString() in engagementData && engagementData[(new Date(currentDate.getFullYear(), currentDate.getMonth(), day - firstDay)).toDateString()].map(engagement =>
                <div key={engagement.id} className='hover:bg-[#7694c0] cursor-pointer rounded-md px-2' onClick={() => { setSelectedEngagement(engagement) }}>
                  <svg className='inline mr-1' width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="7" cy="7" rx="7" ry="7" fill="#1E2A78" />
                  </svg>
                  {engagement.title}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedEngagement &&
        ("confirmedSpeakers" in selectedEngagement ?
        <AdminEngagementPopup
          engagement={selectedEngagement}
          setEngagement={(engagement: EngagementWithSpeakers) => {
            setEngagements(engagements => {
              const index = engagements.findIndex(e => e.id === engagement.id);
              if (index === -1) {
                return engagements;
              }
              const newEngagements = [...engagements];
              newEngagements[index] = engagement;
              return newEngagements;
            });
          }}
          onClose={() => { setSelectedEngagement(null) }}
        />
        :
        <SpeakerEngagementPopup
          engagement={selectedEngagement}
          setEngagement={(engagement: EngagementWithStatus) => {
            setEngagements(engagements => {
              const index = engagements.findIndex(e => e.id === engagement.id);
              if (index === -1) {
                return engagements;
              }
              const newEngagements = [...engagements];
              newEngagements[index] = engagement;
              return newEngagements;
            });
          }}
          onClose={() => { setSelectedEngagement(null) }}
        />)
      }
    </>
  );
};
export default CalendarView;