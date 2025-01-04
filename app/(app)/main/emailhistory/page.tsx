import { getEmails } from "@/lib/db/utils"
import EmailHistory from "./EmailHistory"

export default async function Page() {
    const emails = await getEmails()

    return (
        <>
            <EmailHistory emails={emails} />
        </>
    )
}