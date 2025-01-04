import { getSelf, getUser } from "@/lib/db/utils"
import { notFound } from "next/navigation"
import UserView from "./UserView"

export const revalidate = 0

export default async function Page({ params }: { params: { id: string } }) {
    const user = await getUser(parseInt(params.id))
    const self = await getSelf()

    if (!user || !self) {
        notFound()
    }
    const isSelf = self.id === user.id
    if (!isSelf && !(self.role === "ADMIN")) {
        notFound()
    }

    return (
        <>
            <UserView
                user={user}
            />
        </>

    )
}