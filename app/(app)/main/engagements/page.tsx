import EngagementsView from "./EngagementsView";
import { getEngagements, isAdmin } from "@/lib/db/utils";

export default async function Engagements() {
    const engagements = await getEngagements()
    const admin = await isAdmin()
    return (
        <EngagementsView 
            engagementsData={engagements} 
            admin={admin} 
        />
    )
}