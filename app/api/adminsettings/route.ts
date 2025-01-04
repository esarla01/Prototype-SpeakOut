import { isAdmin } from "@/lib/db/utils";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    if (!(await isAdmin())) {
        return new NextResponse(null, { status: 401 });
    }

    const body = await request.json();
    const { tagList, defaultInviteMessage, defaultAcceptMessage, defaultDeclineMessage } = body;

    try {
        await prisma.tag.deleteMany();
        await prisma.tag.createMany({
            data: tagList.map((tag: string) => ({ name: tag }))
        });
        await prisma.defaultEmail.update({
            where: { name: "speakerInvite" },
            data: { message: defaultInviteMessage }
        });
        await prisma.defaultEmail.update({
            where: { name: "speakerAccept" },
            data: { message: defaultAcceptMessage }
        });
        await prisma.defaultEmail.update({
            where: { name: "speakerReject" },
            data: { message: defaultDeclineMessage }
        });

        return new NextResponse(
            JSON.stringify({message: "success"}), 
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error("Failed to update setting:", error);
        return new NextResponse(JSON.stringify({ error: "Failed to update setting" }), { status: 500 });
    }
}