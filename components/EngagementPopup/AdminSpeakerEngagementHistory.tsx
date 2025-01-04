import React, { useState, useEffect } from "react";
import Typography from "../Typography";
import { EngagementWithSpeakers } from "@/lib/types";

interface Notification {
  id: number;
  createdAt: Date;
  engagementId: number;
  title: string;
}

export function AdminSpeakerEngagementHistory({
  engagement,
}: {
  engagement: EngagementWithSpeakers;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const res = await fetch(
          `/api/engagementLog/engagementId?id=${engagement.id}`
        );
        if (!res.ok) {
          throw new Error(
            `Failed to fetch notifications, status: ${res.status}`
          );
        }
        const data: Notification[] = await res.json();
        // Sort notifications by createdAt in descending order (most recent first)
        data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setNotifications(data);
      } catch (error) {
        console.error("Fetching notifications failed:", error);
        setNotifications([]);
      }
    }
    fetchNotifications();
  }, [engagement.id]);

  return (
    <div className="space-y-2">
      <div className="admin-engagement-history">
        <Typography variant="h3">Engagment History Log</Typography>
        <div className="max-h-[300px] overflow-y-scroll">
          {
            notifications.length === 0 && (
              <p> Nothing to show yet for this engagement. </p>
            )
          }
          {notifications.map((notification) => (
            <div
              key={notification.id} // Add unique key prop here
              className="w-[100%] border border-black p-1 rounded-lg my-1"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <h3>{notification.title}</h3>
              <p>{new Date(notification.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
