"use client"

import React, { useEffect, useState } from "react";
import ListView from "./(list)/ListView";
import MonthSwitch from "@/app/(app)/main/engagements/(calendar)/MonthSwitch";
import Button from "@/components/Button";
import ViewSelector, { View } from "./ViewSelector";
import { FaPlusCircle } from "react-icons/fa";
import { EngagementWithSpeakers, EngagementWithStatus } from "@/lib/types";
import AdminEngagementCreate from "@/components/EngagementPopup/AdminEngagementCreate";
import CalendarView from "./(calendar)/CalendarView";
import { useRouter, useSearchParams } from "next/navigation";

interface EngagementsViewProps {
    engagementsData: (EngagementWithSpeakers | EngagementWithStatus)[];
    admin: boolean;
}

export default function EngagementsView({ engagementsData, admin }: EngagementsViewProps) {
    const [view, setView] = useState<View>("List")
    const [engagements, setEngagements] = useState<(EngagementWithSpeakers | EngagementWithStatus)[]>(engagementsData)
    const [showCreateEvent, setShowCreateEvent] = useState(false)
    const searchParams = useSearchParams()
    let currentDate = searchParams.get("date")? new Date(searchParams.get("date") as string) : new Date()
    if (currentDate.toString() === "Invalid Date") {
        currentDate = new Date()
    }

    return (
        <>
            <div className="grid grid-cols-1 xl:grid-cols-3 space-y-3 mb-4">
                <div>
                    <ViewSelector view={view} setView={setView} />
                </div>
                <MonthSwitch currentDate={currentDate} />
                {
                    admin ?
                        <div className="w-full flex flex-row xl:justify-end justify-center">
                            <div className="h-full flex flex-col justify-center">
                                <Button variant="primary" onClick={() => setShowCreateEvent(true)}>
                                    New Event <FaPlusCircle className="inline" />
                                </Button>
                            </div>
                        </div>
                        :
                        <span></span>
                }
            </div>
            {view === "List" ?
                <ListView
                    currentDate={currentDate}
                    engagements={engagements}
                    setEngagements={setEngagements}
                /> :
                <CalendarView
                    currentDate={currentDate}
                    engagements={engagements}
                    setEngagements={setEngagements}
                />
            }
            {
                showCreateEvent &&
                <AdminEngagementCreate onClose={() => setShowCreateEvent(false)} setEngagements={setEngagements} />
            }
        </>
    );
}