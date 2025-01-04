
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/db/utils";

export async function GET(request: Request) {
    try {
        // Fetch all tags from the database
        const tags = await prisma.tag.findMany({
            select: {
                id: true,   // Assuming you want to retrieve the id
                name: true  // and the name of each tag
            }
        });

        // Return the tags as an array of objects in the response
        return new NextResponse(JSON.stringify(tags), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        // Log the error and return a 500 Internal Server Error status
        console.error("Failed to fetch tags:", error);
        return new NextResponse(JSON.stringify({ error: "Failed to fetch tags" }))
    }
}

export async function POST(request: Request) {
    if (!(await isAdmin())) {
        return new NextResponse(null, { status: 401 });
    }

    try {
        const body = await request.json();
        const { name } = body;

        if (!name) {
            return new NextResponse(JSON.stringify({ error: "Tag name is required" }), { status: 400 });
        }

        // Check if the tag already exists to prevent duplicates
        const existingTag = await prisma.tag.findUnique({
            where: { name: name },
        });

        if (existingTag) {
            return new NextResponse(JSON.stringify({ error: "Tag already exists" }), { status: 409 });
        }

        // Create the new tag
        const newTag = await prisma.tag.create({
            data: {
                name: name,
            },
        });

        return new NextResponse(JSON.stringify(newTag), { status: 201, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error("Failed to create tag:", error);
        return new NextResponse(JSON.stringify({ error: "Failed to create tag" }), { status: 500 });
    }
}

export async function DELETE(request: Request) {

    if (!(await isAdmin())) {
        return new NextResponse(null, { status: 401 });
    }

    // Creating a type URL searchParams variable
    // const { searchParams } = new URL(request.url)

    const { searchParams } = new URL(request.url);
    const tagName = searchParams.get('tag');

    // Validate tag names
    if (!tagName) {
        return new Response(JSON.stringify({ error: "No tags provided" }), { status: 400 });
    }

    try {
        // Attempt to delete the tags
        const deletedTag = await prisma.tag.delete({
            where: {
                name: tagName
            }
        });

        if (!deletedTag) {
            return new Response(JSON.stringify({ message: "No tags found to delete" }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: `Deleted tag ${tagName} successfully` }), { status: 200 });
    } catch (error) {
        // Generic internal error
        return new Response(JSON.stringify({ error: "An unknown error occurred while trying to delete the tags." }), { status: 500 });
    }
}