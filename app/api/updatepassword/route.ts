import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSelf } from "@/lib/db/utils";
import prisma from "@/lib/prisma";
import { passwordRegex } from "@/lib/regex";

export async function POST(request: Request) {
    const { oldPassword, newPassword, confirmNewPassword } = await request.json();
    if (!oldPassword || !newPassword || !confirmNewPassword) {
        return new NextResponse(
            JSON.stringify({ error: "Please fill out all fields." }),
            { status: 400 }
        );
    }
    if (!newPassword.match(passwordRegex)) {
        return new NextResponse(
            JSON.stringify({ error: "Password must be at least 8 characters long \
            and contain at least 1 uppercase letter, 1 lowercase letter, 1 number,\
             and 1 special character." }),
            { status: 400 }
        );
    }
    if (newPassword !== confirmNewPassword) {
        return new NextResponse(
            JSON.stringify({ error: "Passwords do not match." }),
            { status: 400 }
        );
    }
    // check if old password is correct
    const self = await getSelf();
    const selfWithPassword = await prisma.user.findUnique({ where: { id: self?.id }, select: { password: true } });
    if (!selfWithPassword) {
        return new NextResponse(
            JSON.stringify({ error: "User not found." }),
            { status: 400 }
        );
    }
    const validPassword = await bcrypt.compare(oldPassword, selfWithPassword.password);
    if (!validPassword) {
        return new NextResponse(
            JSON.stringify({ error: "Invalid password." }),
            { status: 400 }
        );
    }

    // update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
        where: { id: self?.id },
        data: {
            password: hashedPassword
        }
    });

    return new NextResponse(JSON.stringify("success"), { status: 200 });
}