import Typography from "@/components/Typography";
import { EngagementWithSpeakers, EngagementWithStatus } from "@/lib/types";
import { EngagementCard } from "./EngagmentCard";
import { Dispatch, SetStateAction } from "react";

interface UpcomingEngagementsModuleProps {
    title: string;
    emptyMessage: string;
    engagements: (EngagementWithStatus | EngagementWithSpeakers)[];
    setEngagements: Dispatch<SetStateAction<(EngagementWithSpeakers | EngagementWithStatus)[]>>;
    isAdmin: boolean;
}

export default function UpcomingEngagementsModule({ title, emptyMessage, engagements, setEngagements, isAdmin }: UpcomingEngagementsModuleProps) {
    return (
        <>
            <div className="my-4"><Typography variant="h2"> {title} </Typography></div>
            <div className="grid grid-cols-1 gap-4">
                {
                    engagements.map((engagement) => {
                        const setEngagement = (engagement: EngagementWithSpeakers) => {
                            setEngagements(engagements => {
                                const index = engagements.findIndex(e => e.id === engagement.id);
                                if (index === -1) {
                                    return engagements;
                                }
                                const newEngagements = [...engagements];
                                newEngagements[index] = engagement;
                                return newEngagements;
                            });
                        }
                        return (
                            <div key={engagement.id}>
                                <EngagementCard
                                    engagement={engagement}
                                    setEngagement={engagement => setEngagement(engagement as any)}
                                    isAdmin={isAdmin}
                                />
                            </div>
                        )
                    })
                }
                {
                    engagements.length === 0 &&
                    <div>
                        <Typography variant="p1"> {emptyMessage} </Typography>
                    </div>
                }

            </div>
        </>
    )
}