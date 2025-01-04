import { getSelf } from "@/lib/db/utils";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// self only
export async function POST(request: Request) {
    const user = await getSelf()
    if (user == null) {
        return new NextResponse(JSON.stringify({ error: "User not found" }), { status: 404 });
    }
    const userId = user.id;
    const body = await request.json();
    const { engagementId } = body;

    // Check for missing parameters
    if (!engagementId || !userId) {
        return new NextResponse("Missing engagementId or userId!", { status: 400 });
    }

    // Find the engagement and determine the user's status (pending or confirmed)
    const engagement = await prisma.engagement.findUnique({
        where: {
            id: engagementId,
        },
        include: {
            pendingSpeakers: {
                where: {
                    id: userId,
                },
            },
            confirmedSpeakers: {
                where: {
                    id: userId,
                },
            },
        },
    });

    if (!engagement) {
        return new NextResponse(
            JSON.stringify({ error: "Engagement not found!" }), 
            { status: 404 }
        );
    }

    // If the user is not a pending or confirmed speaker, return an error
    if (engagement.pendingSpeakers.length === 0 && engagement.confirmedSpeakers.length === 0) {
        return new NextResponse("Not signed up or confirmed for the engagement!", { status: 400 });
    }

    // Determine which list to disconnect the user from
    const disconnectFrom = engagement.pendingSpeakers.length > 0 ? 'pendingSpeakers' : 'confirmedSpeakers';

    // Disconnect the user from the appropriate list
    try {
        await prisma.engagement.update({
            where: { id: engagementId },
            data: {
                [disconnectFrom]: {
                    disconnect: [{ id: userId }],
                },
            },
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: "Error in opting out of the event." }), { status: 401 });
    }

    // Fetch an Admin User
    const adminUser = await prisma.user.findFirst({
        where: {
            role: 'ADMIN',
        },
    });

    if (!adminUser) {
        return new NextResponse(
            JSON.stringify({ error: "No admin user found." }), 
            { status: 404 }
        );
    }

    // Send a notification for the Admin user    
    await prisma.notification.create({
        data: {
            title: `${user.firstname} ${user.lastname} opted out of ${engagement.title}.`,
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
                title: `${user.firstname} ${user.lastname} opted out of ${engagement?.title}.`,
                userId: user.id,
                engagementId: engagementID
            },
        });
    }

    return new NextResponse(JSON.stringify({ status: "unmarked" }), { status: 200 });
}
