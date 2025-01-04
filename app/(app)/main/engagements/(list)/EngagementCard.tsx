"use client"

import Button from '@/components/Button'
import Typography from '@/components/Typography'
import { IoMdTime } from "react-icons/io"
import { FaRegDotCircle } from "react-icons/fa"
import { dateToAMPM } from '@/lib/utils'
import { AdminEngagementPopup } from '@/components/EngagementPopup/AdminEngagementPopup'
import { useState } from 'react'
import { EngagementWithSpeakers, EngagementWithStatus } from '@/lib/types'
import SpeakerEngagementPopup from '@/components/EngagementPopup/SpeakerEngagementPopup'
import Image from 'next/image'

interface EngagementCardProps {
    engagement: EngagementWithSpeakers | EngagementWithStatus;
    setEngagement: (engagement: EngagementWithSpeakers | EngagementWithStatus) => void;
}

export default function EngagementCard({ engagement, setEngagement }: EngagementCardProps) {
    const startDate = new Date(engagement.start)
    const endDate = new Date(engagement.end)
    const startTime: string = dateToAMPM(startDate)
    const endTime: string = dateToAMPM(endDate)
    const date = startDate.toLocaleDateString()
    const [showEngagement, setShowEngagment] = useState<boolean>(false);

    return (
        <span className="bg-white border-[#172554] border rounded-lg p-3 text-left flex flex-col">
            <Image 
                src={engagement.image? engagement.image : '/images/engagement-default.jpeg'} 
                alt="Engagement Image" 
                className="mb-2 rounded-lg mx-auto w-full h-[140px] object-cover" 
                width={100}
                height={100}
            />
            <div className='text-wrap'> <Typography variant="h3"> {engagement.title} </Typography></div>
            <div className="flex flex-row items-center">
                <IoMdTime className="pr-1" size={25} />
                <span className="bg-white py-1 rounded-full">{startTime}-{endTime}, {date}</span>
            </div>
            <div className="flex flex-row items-center mb-1">
                <FaRegDotCircle className="pr-1" size={20} />
                <span className="bg-white py-1 rounded-full"> {engagement.status} </span>
            </div>
            <div className="flex flex-col justify-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                <Button variant="outline-blue" onClick={() => setShowEngagment(true)}>Details</Button>
            </div>
            {showEngagement &&
                ("confirmedSpeakers" in engagement ?
                <AdminEngagementPopup
                    engagement={engagement}
                    setEngagement={setEngagement}
                    onClose={() => { setShowEngagment(false) }}
                />
                :
                <SpeakerEngagementPopup
                    engagement={engagement}
                    setEngagement={setEngagement} 
                    onClose={() => { setShowEngagment(false) }}
                />)
            }
        </span>
    );
}