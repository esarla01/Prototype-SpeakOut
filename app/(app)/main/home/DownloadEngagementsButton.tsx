"use client"

import { EngagementWithSpeakers } from "@/lib/types";
import { useEffect, useState } from "react";

interface DownloadEngagementsButtonProps {
    engagements: EngagementWithSpeakers[];
}

export default function DownloadEngagementsButton({ engagements }: DownloadEngagementsButtonProps) {
    const [url, setUrl] = useState<string>("");

    useEffect(() => {
        const csv_head = `Title, Site Name, Address, Start, End, Status, Capacity, Speakers\n`;
        const csv_body = engagements.map(engagement => {
            return `${engagement.title},${engagement.sitename},${engagement.address},${engagement.start},${engagement.end},${engagement.status},${engagement.capacity},${engagement.confirmedSpeakers.map(speaker => speaker.firstname + " " + speaker.lastname).join(" | ")}`
        }
        ).join("\n");
        const csv = csv_head + csv_body;
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        setUrl(url);
    }, [engagements])

    return (
        <>
            <a className="text-[#0000FF] underline" href={url} download={'engagements.csv'}>
                Download Engagements CSV
            </a>
        </>
    )
}