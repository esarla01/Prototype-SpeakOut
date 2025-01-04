import { getSelf } from "@/lib/db/utils";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

//API route to fetch all notifications for a specific user from the database
export async function GET(request: Request) {
    const user = await getSelf()
    if (user == null) {
        return new NextResponse(null, { status: 401 });
    }
    
    const notifications = await prisma.notification.findMany({
        where: { userId: Number(user?.id) }
    })

    return NextResponse.json(notifications)
}