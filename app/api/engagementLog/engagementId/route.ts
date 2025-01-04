import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const engagementID = searchParams.get('id')

    const notification = await prisma.engagementLog.findMany({
        where: { engagementId : Number(engagementID) }
    })

    return NextResponse.json(notification)
}
