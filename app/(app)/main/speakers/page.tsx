import { notFound } from 'next/navigation'
import SpeakerView from "./SpeakerView"
import { getEngagements, getUsers, isAdmin } from "@/lib/db/utils";
import { EngagementWithSpeakers } from '@/lib/types';


export default async function SpeakerPage() {
  if (!(await isAdmin())) {
    return notFound()
  }
  const users = await getUsers();
  const engagements = await getEngagements();
  return (
    <SpeakerView 
      users={users} 
      engagements={engagements as EngagementWithSpeakers[]}
    />
  )
}