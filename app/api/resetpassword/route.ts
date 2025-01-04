import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { passwordRegex } from "@/lib/regex";

export async function POST(request: Request) {    
    const { code, newPassword, confirmNewPassword } = await request.json();
    if (!code || !newPassword || !confirmNewPassword) {
        return new NextResponse(
            JSON.stringify({ error: "Invalid code." }),
            { status: 400 }
        );
    }
    if (!newPassword.match(passwordRegex)) {
        return new NextResponse(
            JSON.stringify({ error: "Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character." }),
            { status: 400 }
        );
    }
    if (newPassword !== confirmNewPassword) {
        return new NextResponse(
            JSON.stringify({ error: "Passwords do not match." }),
            { status: 400 }
        );
    }
    const deletedCode = await prisma.forgotPassword.findFirst({
        where: {
            code: code
        }
    });
    if (!deletedCode) {
        return new NextResponse(
            JSON.stringify({ error: "Invalid code." }),
            { status: 400 }
        );
    }
    await prisma.forgotPassword.delete({
        where: {
            code: code
        }
    });
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
        where: {
            email: deletedCode.email
        },
        data: {
            password: hashedPassword
        }
    });

    return new NextResponse(JSON.stringify("success"), { status: 200 });
}