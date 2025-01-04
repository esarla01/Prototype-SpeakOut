"use client"
import React from 'react';
import { Notification } from '@prisma/client';
import Button from '../../../../components/Button';

interface Props {
  notification: Notification
  clearNotification: () => void
}

export function NotificationCard({ notification, clearNotification }: Props) {
  return (
    <div className="bg-white border-black px-4 py-2 border rounded-lg flex justify-between items-center">
      {/* <div className="hidden sm:block">
      <Avatar image={"https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"} />
      </div> */}
      <span className='ml-3 text-[#1E2A78]'>{notification.title}</span>
      <Button variant='secondary' onClick={clearNotification}> Clear </Button>
    </div>
  );
}
