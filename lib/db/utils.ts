import prisma from "../prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserNoPassword, userNoPasswordFields } from "../types";

export const isAdmin = async () => {
    const session = await getServerSession(authOptions);
    const sessionUser: any = session?.user;
    if (!session || !session.user || sessionUser.role !== "ADMIN") {
        return false;
    }
    return true;
}

export const getUsers = async () => {
    if (!(await isAdmin())) {
        return [];
    }
    const users = await prisma.user.findMany({
        select: userNoPasswordFields,
    });
    return users;
}

export const getSelf = async () => {
    const session = await getServerSession(authOptions);
    const sessionUser: any = session?.user;
    if (!session || !session.user) {
        return null;
    }
    const user: UserNoPassword | null = await prisma.user.findUnique({
        select: userNoPasswordFields,
        where: {
            id: parseInt(sessionUser.id)
        }
    });
    return user;
}

export const getUser = async (id: number) => {
    // ensure that user is admin or the user is the same as the one being requested
    const session = await getServerSession(authOptions);
    const sessionUser: any = session?.user;
    if (!id || !session || !session.user || (sessionUser.role !== "ADMIN" && parseInt(sessionUser.id) !== id)) {
        return null;
    }
    const user = await prisma.user.findUnique({
        select: userNoPasswordFields,
        where: {
            id: id
        }
    });
    return user;
}

export const getDefaultMessages = async () => {
    if (!(await isAdmin())) {
        return [];
    }
    const messages = await prisma.defaultEmail.findMany();
    return messages;
}

export const getEngagements = async () => {
    if (await isAdmin()) {
        return await prisma.engagement.findMany({
            include: {
                pendingSpeakers: {
                    select: userNoPasswordFields
                },
                confirmedSpeakers: {
                    select: userNoPasswordFields
                },
                rejectedSpeakers: {
                    select: userNoPasswordFields
                }
            }
        });
    } else {
        const currUser = await getSelf();
        if (!currUser) {
            return [];
        }
        const userId = currUser.id;
        const userEngagements = await prisma.engagement.findMany({
            include: {
                confirmedSpeakers: {
                    where: {
                        id: userId
                    }
                },
                pendingSpeakers: {
                    where: {
                        id: userId
                    }
                },
                rejectedSpeakers: {
                    where: {
                        id: userId
                    }
                }
            }
        });
        return userEngagements.map(engagement => {
            let speakerstatus = "unmarked";
            if (engagement.confirmedSpeakers.length > 0) {
                speakerstatus = "confirmed";
            } else if (engagement.pendingSpeakers.length > 0) {
                speakerstatus = "pending";
            }  else if (engagement.rejectedSpeakers.length > 0) {
                speakerstatus = "rejected";
            }
            const {confirmedSpeakers, pendingSpeakers, ...engagementWithoutSpeakers} = engagement;
            return {
                ...engagementWithoutSpeakers,
                speakerstatus
            }
            ;
        });
    }
}

export const getTagsList = async () => {
    const tags = await prisma.tag.findMany({
        select: {
            id: true,
            name: true
        }
    });
    return tags;
}

export const getNotifications = async () => {
    const session = await getServerSession(authOptions);
    const sessionUser: any = session?.user;
    if (!session || !session.user) {
        return [];
    }
    const notifications = await prisma.notification.findMany({
        where: {
            userId: parseInt(sessionUser.id)
        }
    });
    return notifications;
}

export const getEmails = async () => {
    if (!(await isAdmin())) {
        return [];
    }
    const emails = await prisma.email.findMany();
    return emails;
}