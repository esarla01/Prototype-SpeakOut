import { getSelf } from "@/lib/db/utils";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// self only
export async function POST(request: Request) {
    const user = await getSelf();
    if (user == null) {
        return new NextResponse(JSON.stringify({ error: "User not found" }), { status: 404 });
    }
    const userId = user.id;
    const body = await request.json();
    const { engagementId } = body;

    if (!engagementId) {
        return new NextResponse(JSON.stringify({ error: "Missing engagementId." }), { status: 400 })
    }

    // If the user is already a pending or confirmed speaker, return an error message.
    const engagement = await prisma.engagement.findUnique({
        where: { id: engagementId },
        include: {
            pendingSpeakers: {
                where: { id: userId },
            },
            confirmedSpeakers: {
                where: { id: userId },
            },
        },
    });
    if (engagement?.pendingSpeakers.length || engagement?.confirmedSpeakers.length) {
        return new NextResponse(
            JSON.stringify({ error: "User is already signed up for the engagement" }), 
            { status: 400 }
        );
    }

    try {
        // add the user to pending speakers
         await prisma.engagement.update({
            where: { id: engagementId },
            data: {
                pendingSpeakers: {
                    connect: [{ id: userId }],
                },
            },
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: "An unknown error occurred while signing up the user." }), { status: 400 })
    }

    // Fetch an Admin User
    const adminUser = await prisma.user.findFirst({
        where: {
            role: 'ADMIN',
        },
    });

    if (adminUser == null) {
        return new NextResponse(JSON.stringify({ error: "No admin user found" }), { status: 500 });
    }

    // Send a notification for the Admin user    
    await prisma.notification.create({
        data: {
            title: `${user.firstname} ${user.lastname} signed up for ${engagement?.title}.`,
            user: {
                connect: {
                    id: adminUser.id,
                },
            },
        },
    });

    const engagementID = engagement?.id
    if (engagementID) {
        await prisma.engagementLog.create({
            data: {
                title: `${user.firstname} ${user.lastname} signed up for ${engagement?.title}.`,
                userId: user.id,
                engagementId: engagementID
            },
        });
    }

    return new NextResponse(JSON.stringify({ status: "pending" }), { status: 200 });
}