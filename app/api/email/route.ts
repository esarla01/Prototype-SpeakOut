import sendEmail from "@/lib/email/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { emails, message } = await request.json();
    if (!emails || !message) {
        return new NextResponse(
            JSON.stringify({ error: "No email provided for invitation!" }),
            { status: 400 }
        );
    }
    
    for (const email of emails) {
        const { data, error } = await sendEmail(email, 'Message from SpeakOUT Boston', message);
    }

    return new NextResponse(JSON.stringify("success"), { status: 200 });
}