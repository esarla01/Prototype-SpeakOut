import { Resend } from 'resend';
import prisma from '../prisma';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendEmail(email: string, subject: string, text: string) {
    const { data, error } = await resend.emails.send({
        from: 'SpeakOUT Engagements <SpeakOUTEngagments@jimmymaslen.com>',
        to: [email],
        subject: subject,
        text: text,
    });
    await prisma.email.create({
        data: {
            subject: subject,
            message: text,
            recipients: [email],
        }
    })
    return { data, error };
};