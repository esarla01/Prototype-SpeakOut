"use client"
import React from 'react';
import Avatar from '@/components/Avatar';

interface Props {
  image: string;
  name: string;
  description: string;
}


export function NotifCard({ image, name, description }: Props) {
  return (
    <div className="bg-white border-black px-4 py-2 border-2 rounded-lg flex items-center">
      <Avatar image={"https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"} />
      <span className='ml-3 text-[#1E2A78]'>{name} {description}</span>
    </div>
  );
}
