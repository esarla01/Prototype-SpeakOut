import { Engagement, Prisma } from "@prisma/client"
import { z } from "zod"
import { AdminSettingsSchema } from "./schema"

// export type EngagementWithSpeakers = Prisma.EngagementGetPayload<{
//     include: { pendingSpeakers: true, confirmedSpeakers: true }
// }>

export interface EngagementWithSpeakers extends Engagement {
    pendingSpeakers: UserNoPassword[]
    confirmedSpeakers: UserNoPassword[]
    rejectedSpeakers: UserNoPassword[]
}

export interface EngagementWithStatus extends Engagement {
    speakerstatus: string
}

export const userNoPasswordFields = { 
    id: true, 
    email: true, 
    firstname: true, 
    lastname: true, 
    role: true, 
    tags: true, 
    image: true, 
    about: true, 
    pronouns: true,
    phonenum: true
}

export type UserNoPassword = Prisma.UserGetPayload<{
    select: typeof userNoPasswordFields
}>

export type SpeakerStatus = "unmarked" | "pending" | "confirmed"

export type AdminSetting = z.infer<typeof AdminSettingsSchema>