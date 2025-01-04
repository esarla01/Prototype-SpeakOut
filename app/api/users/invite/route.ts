import { isAdmin } from "@/lib/db/utils";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import sendEmail from "@/lib/email/utils";
import { Role } from "@prisma/client";

export async function POST(request: Request) {
    if (!(await isAdmin())) {
        return new NextResponse(null, { status: 401 });
    }
    const { email, message, role } = await request.json();
    if (!email || !role) {
        return new NextResponse(
            JSON.stringify({ error: "No email provided for invitation." }),
            { status: 400 }
        );
    }
    const user = await prisma.user.findFirst({
        where: {
            email: email,
        },
    });
    if (user) {
        return new NextResponse(
        JSON.stringify({ error: "User already exists with the provided email." }),
        { status: 400 }
        );
    }
    const roleEnum = role === "Admin" ? Role.ADMIN : Role.USER;
    const invite = await prisma.invite.create({
        data: {
            email: email,
            role: roleEnum,
            code: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        },
    });
    const urlSearchParams = new URLSearchParams({accessCode: invite.code});
    await sendEmail(
        email, 
        'Welcome to SpeakOUT Boston!', 
        `${message}\n\nYour invite code is: ${invite.code}. To create an account, \
        visit https://engagements.speakoutboston.org/register?${urlSearchParams}`
    )
    return new NextResponse(JSON.stringify(invite), { status: 200 });
}