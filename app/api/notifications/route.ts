import { getSelf } from "@/lib/db/utils";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
    // find notification by id and delete
    const self = await getSelf();
    if (!self) {
        return new NextResponse(null, { status: 401 });
    }
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) {
        return new NextResponse(JSON.stringify({error: "No id provideed."}), { status: 400 });
    }
    const notification = await prisma.notification.findUnique({
        where: { id: Number(id) },
    });
    if (!notification) {
        return new NextResponse(JSON.stringify({error: "Notification not found."}), { status: 404 });
    }
    if (notification.userId !== self.id) {
        return new NextResponse(null, { status: 403 });
    }
    const deletedNotification = await prisma.notification.delete({
        where: { id: Number(id) },
    });

    return new NextResponse(JSON.stringify({deletedNotification: deletedNotification}), { status: 200 });
}