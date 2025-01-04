'use client'

import { UserNoPassword } from '@/lib/types';
import React, { useState } from 'react';
import PopupModal from './EngagementPopup/PopupModal';
import IdentityTag from './IdentityTag';
import Button from './Button';

export const EmailSpeakers = ({ users, onClose }: { users: UserNoPassword[]; onClose: () => void; }) => {
    const [message, setMessage] = useState("These speakers rock!");
    const [visibleUsers, setVisibleUsers] = useState<UserNoPassword[]>(users);

    const handleEmailClick = (userToRemove: any) => {
        setVisibleUsers(visibleUsers.filter((user) => user !== userToRemove));
    };

    const handleCancelClick = () => {
        onClose();
    };

    async function send() {
        await fetch('/api/email', {
            method: 'POST',
            body: JSON.stringify({
                emails: visibleUsers.map(user => user.email),
                message: message
            })
        });
        onClose();
    }

    return (
        <PopupModal onClose={onClose}>
            <div className='mx-5'>
                {/* email speakers text */}
                <div className="text-3xl font-normal">Email Speakers</div>
                {/* recipients text */}
                <div className="text-xl font-normal mt-4">Recipients</div>
                {/* recipient box */}
                <div className="p-2 bg-white w-full rounded-[20px] border border-black overflow-auto">
                    <div className="flex flex-wrap gap-2">
                        {visibleUsers.map((user, index) => (
                            <IdentityTag 
                                key={index} 
                                label={`${user.firstname} ${user.lastname}`} 
                                onDelete={() => handleEmailClick(user)} 
                            />
                        ))}
                    </div>
                </div>
                {/* message text */}
                <div className="text-xl font-normal mt-4">Message</div>
                {/* text box */}
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full h-[132px] box-border bg-white rounded-[20px] border border-black p-3"
                />
                {/* Button container */}
                <div className="flex justify-end mt-4 space-x-3">
                    {/* Cancel button */}
                    <Button variant='outline-white' onClick={handleCancelClick}>
                        <div className="text-indigo-900 text-base font-bold">Cancel</div>
                    </Button>
                    {/* Send button */}
                    <Button variant='secondary' onClick={send}>
                        <div className="text-indigo-900 text-base font-bold">Send</div>
                    </Button>
                </div>
            </div>
        </PopupModal>
    )
}