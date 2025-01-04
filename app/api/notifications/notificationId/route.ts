import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

//API route to fetch a notification by its ID
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const notificationID = searchParams.get('notificationId')

    const notification = await prisma.notification.findUnique({
        where: { id: Number(notificationID) }
    })

    return NextResponse.json(notification)
}
