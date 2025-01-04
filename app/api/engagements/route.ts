import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/db/utils";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";
import { UserNoPassword } from "@/lib/types";
import { User } from "@prisma/client";

// admin only
export async function POST(request: Request) {
    if (!(await isAdmin())) {
        return new NextResponse(null, { status: 401 });
    }

    const body = await request.json();
    let newEngagement = null;

    let tags = body.tags;
    if (!Array.isArray(tags)) {
        tags = tags.split(','); // Convert from string to array if necessary
    }
    for (let tag of tags) { // Use for-of for array values
        const currTag = await prisma.tag.findMany({
            where: { name: tag }
        });
        if (currTag.length === 0) {
            await prisma.tag.create({
                data: { name: tag }
            });
        }
    }

    try {
        newEngagement = await prisma.engagement.create({
            data: body,
            include: {
                pendingSpeakers: true,
                confirmedSpeakers: true,
                rejectedSpeakers: true,
            }
        })
    } catch (error) {
        if (error instanceof PrismaClientValidationError || error instanceof PrismaClientKnownRequestError) {
            console.error(error)
            return new NextResponse(
                JSON.stringify({ error: "Invalid data format." }),
                { status: 400 }
            );
        }
        return new NextResponse(
            JSON.stringify({ error: "An unknown error occurred while creating the user." }),
            { status: 500 }
        );
    }
    return new NextResponse(JSON.stringify(newEngagement), { status: 200 });
}

// admin only
export async function PATCH(request: Request) {
    if (!(await isAdmin())) {
        return new NextResponse(null, { status: 401 });
    }

    const { searchParams } = new URL(request.url)
    const engagementId = searchParams.get('id')
    if (!engagementId) {
        return new NextResponse(
            JSON.stringify({ error: "Missing engagementId" }),
            { status: 400 }
        );
    }
    const body = await request.json();

    // add tags if they don't exist
    addTags(body.tags);

    // update tags
    const oldEngagement = await prisma.engagement.findUnique({
        where: { id: Number(engagementId) },
        include: {
            pendingSpeakers: true,
            confirmedSpeakers: true,
            rejectedSpeakers: true,
        }
    });
    if (!oldEngagement) {
        return new NextResponse(
            JSON.stringify({ error: "Engagement not found" }),
            { status: 404 }
        );
    }
    const confirmedSpeakersAdded = body.confirmedSpeakers.filter(
        (speaker: User) => !oldEngagement.confirmedSpeakers.includes(speaker));
    await addEngagementLogs("was added to the confirmed for the engagement.", 
                        confirmedSpeakersAdded, 
                        Number(engagementId));
    const rejectedSpeakersAdded = body.rejectedSpeakers.filter(
        (speaker: User) => !oldEngagement.rejectedSpeakers.includes(speaker));
    await addEngagementLogs("was added to the rejected from the engagement.", 
                        rejectedSpeakersAdded, 
                        Number(engagementId));

    let newEngagement = null;
    try {
        const { confirmedSpeakers, pendingSpeakers, ...engagementData } = body
        newEngagement = await prisma.engagement.update({
            where: { id: Number(engagementId) },
            data: {
                ...engagementData,
                confirmedSpeakers: {
                    set: confirmedSpeakers.map((s: UserNoPassword) => ({ id: s.id })),
                },
                pendingSpeakers: {
                    set: pendingSpeakers.map((s: UserNoPassword) => ({ id: s.id })),
                },
                rejectedSpeakers: {
                    set: body.rejectedSpeakers.map((s: UserNoPassword) => ({ id: s.id })),
                },
            },
            include: {
                pendingSpeakers: true,
                confirmedSpeakers: true,
                rejectedSpeakers: true,
            }
        });
    } catch (e) {
        return new NextResponse(JSON.stringify({ error: "Error in engagement update.", e }), { status: 500 });
    }

    return new NextResponse(JSON.stringify(newEngagement), { status: 200 });

}

// admin only
export async function DELETE(request: Request) {
    if (!(await isAdmin())) {
        return new NextResponse(null, { status: 401 });
    }

    // Creating a type URL searchParams variable
    const { searchParams } = new URL(request.url)
    const engagementID = searchParams.get('id')

    try {
        const deletedEngagement = await prisma.engagement.delete({
            where: { id: Number(engagementID) }
        });
        return new Response(JSON.stringify(deletedEngagement), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(
            { error: "An unknown error occurred while trying to delete the user." }),
            { status: 400 }
        );
    }
}

/// Helper functions
async function addTags(tags: string[]) {
    for (let tag of tags) {
        const currTag = await prisma.tag.findMany({
            where: { name: tag }
        });
        if (currTag.length === 0) {
            await prisma.tag.create({
                data: { name: tag }
            });
        }
    }
}

async function addEngagementLogs(message: string, speakers: User[], engagementId: number) {
    for (let speaker of speakers) {
        await prisma.engagementLog.create({
            data: {
                title: speaker.firstname + " " + speaker.lastname + " " + message,
                userId: speaker.id,
                engagementId,
            }
        });
    }
}