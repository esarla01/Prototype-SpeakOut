import HomeView from "@/app/(app)/main/home/HomeView";
import { getNotifications, getSelf, getEngagements } from "@/lib/db/utils";

export default async function Home() {
    const fullUser = await getSelf()
    const notifications = await getNotifications()
    const allEngagements = await getEngagements()
    if (fullUser == null) {
        throw new Error("User not found");
    }

    return (
        <HomeView 
            user={fullUser} 
            notificationData={notifications}
            allEngagements={allEngagements} 
        />
    )
}