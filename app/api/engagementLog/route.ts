import { getSelf } from "@/lib/db/utils";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/db/utils";

export async function POST(request: Request) {
    if (!(await isAdmin())) {
        return new NextResponse(null, { status: 401 });
    }

    try {
        const body = await request.json();
        const { engagementId, title, userId } = body; // Updated variable names

        if (!engagementId || !title || !userId) {
            return new NextResponse(JSON.stringify({ error: "Missing Field Requirements" }), { status: 400 });
        }

        // Create the new engagement notification
        const newEngageNotif = await prisma.engagementLog.create({
            data: {
                title: title,
                engagementId: engagementId,
                userId: userId
            },
        });

        return new NextResponse(JSON.stringify(newEngageNotif), { status: 201, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error("Failed to create Engagement Notification:", error);
        return new NextResponse(JSON.stringify({ error: "Failed to create engagement notification" }), { status: 500 });
    }
}

export async function DELETE(request: Request) {
    // find notification by id and delete
    const self = await getSelf();
    if (!self) {
        return new NextResponse(null, { status: 401 });
    }
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) {
        return new NextResponse(JSON.stringify({ error: "No id provideed." }), { status: 400 });
    }
    const engageNotif = await prisma.engagementLog.findUnique({
        where: { id: Number(id) },
    });
    if (!engageNotif) {
        return new NextResponse(JSON.stringify({ error: "Notification not found." }), { status: 404 });
    }
    const deletedEngageNotif = await prisma.notification.delete({
        where: { id: Number(id) },
    });

    return new NextResponse(JSON.stringify({ deletedEngageNotif: deletedEngageNotif }), { status: 200 });
}