import { getSelf } from "@/lib/db/utils";
import prisma from "@/lib/prisma";
import { Prisma, Role } from "@prisma/client";
import { NextResponse } from "next/server";

// self only
export async function PATCH(request: Request) {
    const self = await getSelf();
    if (self == null) {
        return new Response(JSON.stringify(
            { error: "User not found" }), 
            { status: 404 }
        );
    }
    // get id from query param
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) {
        return new Response(JSON.stringify(
            { error: "No ID provided for updating a user!" }), 
            { status: 400 }
        );
    }
    const body = await request.json();
    if (Number(id) !== self.id && self.role !== Role.ADMIN) {
        return new Response(JSON.stringify(
            { error: "You are not authorized to update this user's profile" }), 
            { status: 403 }
        );
    }
    delete body.password;
    delete body.id;
    delete body.createdAt;
    delete body.updatedAt;
    delete body.role;
    
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
        const updatedUser = await prisma.user.update({
            where: {
                id: Number(id),
            },
            data: body,
        });
        return new NextResponse(
            JSON.stringify(updatedUser), 
            { status: 200 }
        );
    } catch (error) {
        // if error is because email not unique
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return new NextResponse(
                JSON.stringify({ error: "Email already in use." }), 
                { status: 400 }
            );
        }

        return new NextResponse(
            JSON.stringify({ error: "An unknown error occurred while updating the user." }),
            { status: 500 }
        );
    }
}