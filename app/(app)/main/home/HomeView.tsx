"use client"

import Typography from '@/components/Typography'
import { useState } from "react";
import { EngagementWithSpeakers, EngagementWithStatus, UserNoPassword } from "@/lib/types";
import { Notification, Role } from "@prisma/client";
import { NotificationCard } from "@/app/(app)/main/home/NotificationCard";
import Button from "@/components/Button";
import AdminEngagementCreate from "@/components/EngagementPopup/AdminEngagementCreate";
import { FaPlusCircle } from "react-icons/fa";
import UpcomingEngagementsModule from "./UpcomingEngagementsModule";
import DownloadEngagementsButton from './DownloadEngagementsButton';

interface HomeViewProps {
    user: UserNoPassword,
    notificationData: Notification[],
    allEngagements: (EngagementWithSpeakers | EngagementWithStatus)[],
}

export default function HomeView({ user, allEngagements, notificationData }: HomeViewProps) {
    const [engagements, setEngagements] = useState<(EngagementWithSpeakers | EngagementWithStatus)[]>(allEngagements);
    const [notifications, setNotifications] = useState<Notification[]>(notificationData)
    const [showCreateEvent, setShowCreateEvent] = useState(false)

    const clearNotification = async (id: number) => {
        const res = await fetch(`/api/notifications?id=${id}`, {
            method: 'DELETE',
        })
        if (res.ok) {
            const data = await res.json()
            const deletedNotification = data.deletedNotification
            setNotifications(notifications => notifications.filter(n => n.id !== deletedNotification.id))
        }
    }

    return (
        <>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <div className="mb-2"> <Typography variant="h1" > Welcome, {user?.firstname}! </Typography> </div>
                {
                    user.role == Role.ADMIN ?
                        <span className="mt-4"><Button variant="primary" onClick={() => setShowCreateEvent(true)}> New Event <FaPlusCircle className="inline" /> </Button></span>
                        :
                        <span></span>
                }
            </div>

            <div className="my-4"><Typography variant="h2" > Notifications</Typography></div>
            <div className="grid grid-cols-1 gap-4 mb-8">
                {notifications.map((notification) => (
                    <div key={notification.id}>
                        <NotificationCard
                            notification={notification}
                            clearNotification={() => clearNotification(notification.id)}
                        />
                    </div>
                ))}
                {
                    notifications.length === 0 &&
                    <div>
                        <Typography variant="p1">No notifications</Typography>
                    </div>
                }
            </div>

            {user.role == Role.ADMIN &&
                <>
                    <UpcomingEngagementsModule
                        title="All Upcoming Engagements"
                        emptyMessage="No upcoming engagements"
                        engagements={engagements.filter(e => new Date(e.start) > new Date())}
                        setEngagements={setEngagements}
                        isAdmin={true}
                    />
                    <div className="my-4">
                        <DownloadEngagementsButton
                            engagements={engagements as EngagementWithSpeakers[]}
                        />
                    </div>
                </>
            }

            {user.role == Role.USER &&
                <>
                    <UpcomingEngagementsModule
                        title="Confirmed Engagements"
                        emptyMessage="No upcoming confirmed engagements"
                        engagements={engagements.filter(e => new Date(e.start) > new Date() && e.status == "confirmed")}
                        setEngagements={setEngagements}
                        isAdmin={false}
                    />
                    <UpcomingEngagementsModule
                        title="Pending Engagements"
                        emptyMessage="No upcoming pending engagements"
                        engagements={engagements.filter(e => new Date(e.start) > new Date() && e.status == "pending")}
                        setEngagements={setEngagements}
                        isAdmin={false}
                    />
                </>
            }

            {
                showCreateEvent &&
                <AdminEngagementCreate
                    onClose={() => setShowCreateEvent(false)}
                    setEngagements={setEngagements}
                />
            }
        </>
    )
}