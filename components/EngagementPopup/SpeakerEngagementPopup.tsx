'use client'
import React, { useEffect, useState } from 'react';
import Typography from '@/components/Typography';
import { IoMdTime } from "react-icons/io";
import { FaRegDotCircle } from "react-icons/fa";
import IdentityTag from '@/components/IdentityTag';
import { GoLocation } from "react-icons/go";
import { EngagementWithStatus, SpeakerStatus } from '@/lib/types';
import PopupModal from './PopupModal';
import Link from 'next/link';
import { IoCalendarClearOutline } from 'react-icons/io5';
import { dateToAMPM } from '@/lib/utils';
import Button from '../Button';
import { Alert } from '../Alert';

interface SpeakerEngagementPopupProps {
    engagement: EngagementWithStatus;
    setEngagement: (engagement: EngagementWithStatus) => void;
    onClose: () => void;
}

export default function SpeakerEngagementPopup({ engagement, setEngagement, onClose }: SpeakerEngagementPopupProps) {
    const { title, sitename, address, start, status, description, tags } = engagement;

    const signUp = () => {
        fetch("/api/engagements/signup", {
            method: "POST",
            body: JSON.stringify({ engagementId: engagement.id })
        }).then(res =>
            res.json().then(data =>
                setEngagement({ ...engagement, speakerstatus: data.status })))
    }

    const optOut = () => {
        const res = window.confirm("Are you sure you want to opt out of this engagement?")
        if (!res) return
        fetch("/api/engagements/optout", {
            method: "POST",
            body: JSON.stringify({ engagementId: engagement.id })
        }).then(res =>
            res.json().then(data =>
                setEngagement({ ...engagement, speakerstatus: data.status })))
    }

    return (
        <PopupModal onClose={onClose}>
            <span className="text-[#380D5A] font-medium"> <Typography variant="h2">{title}</Typography></span>

            <div className="flex flex-row items-center mb-2 text-sm font-sans text-[#11173D] space-x-2" >
                <GoLocation className="pr-1 text-xl" />
                <Link className='text-[#0000FF] underline' href={`https://www.google.com/maps/search/?api=1&query=${engagement.address}`} target='_blank'>
                    {engagement.sitename}
                </Link>

                <span className="flex flex-row">
                    <IoCalendarClearOutline className="pr-1 text-xl" />
                    {(new Date(engagement.start).toDateString())}
                </span>
                <span className="flex flex-row">
                    <IoMdTime className="pr-1 text-xl" />
                    {dateToAMPM(new Date(engagement.start))} - {dateToAMPM(new Date(engagement.end))}
                </span>

                <FaRegDotCircle className="pr-1 text-xl" />
                {status}
            </div>

            <div className='space-y-4'>
                <div className='space-y-1'>
                    <div>
                        <span className="text-[20px] text-[#380D5A] font-serif font-medium">Description</span>
                    </div>
                    <div>
                        <Typography variant="p1">
                            {description}
                        </Typography>
                    </div>
                </div>
                <div className='space-y-1'>
                    <div>
                        <span className="text-[20px] text-[#380D5A] font-serif font-medium">Identity Tags</span>
                    </div>
                    <div className="flex flex-row space-x-2">
                        {tags.map((tag, index) => (
                            <IdentityTag key={index} label={tag}></IdentityTag>
                        ))}
                    </div>
                </div>
                {engagement.speakerstatus == "unmarked" && (
                    <div className='flex justify-end'>
                        <Button
                            variant="secondary"
                            onClick={signUp}
                        >
                            I&apos;m Available
                        </Button>
                    </div>
                )}
                {engagement.speakerstatus == "pending" && (
                    <>
                        <Alert variant="primary">
                            Your application is currently pending. You will be notified if an admin chooses you to speak.
                        </Alert>
                        <p>
                            Can&apos;t speak anymore?&nbsp;
                            <span
                                className='text-[#0000ff] cursor-pointer underline'
                                onClick={optOut}
                            >
                                Opt out
                            </span>.
                        </p>
                    </>

                )}

                {
                    engagement.speakerstatus == "rejected" && (
                        <>
                            <Alert variant="danger">
                                Sorry, your application to speak at this event has been rejected.
                            </Alert>
                        </>
                    )
                }

                {engagement.speakerstatus == "confirmed" && (
                    <>
                        <Alert variant="success">
                            Congratulations, your application to speak at this event has been accepted!
                        </Alert>
                        <p>
                            Can&apos;t speak anymore?&nbsp;
                            <span
                                className='text-[#0000ff] cursor-pointer underline'
                                onClick={optOut}
                            >
                                Opt out
                            </span>.
                        </p>
                    </>
                )}
            </div>

        </PopupModal>
    );
}
