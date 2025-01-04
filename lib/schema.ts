import { z } from "zod";

export const EngagementSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }).max(100, { message: "Title must be less than 100 characters" }),
    sitename: z.string().min(1, { message: "Site name is required" }).max(50, { message: "Site name must be less than 50 characters" }),
    address: z.string().min(1, { message: "Address is required" }).max(50, { message: "Address must be less than 50 characters" }),
    start: z.date(),
    end: z.date(),
    status: z.string().min(1),
    capacity: z.number().min(1, { message: "Capacity must be greater than 0" }),
    description: z.string().min(1, { message: "Description is required" }).max(2000, { message: "Description must be less than 2000 characters" }),
    tags: z.array(z.string().min(1, { message: "Tag is required" }).max(20, { message: "Tag must be less than 20 characters" })),
    image: z.string(),
})

export const BioDataSchema = z.object({
    firstname: z.string().min(1, { message: "First name is required" }),
    lastname: z.string().min(1, { message: "Last name is required" }),
    image: z.string(),
    pronouns: z.string().min(1, { message: "Pronouns are required" }),
    phonenum: z.string().min(1, { message: "Phone number is required" }),
    about: z.string().min(1, { message: "About is required" }),
    tags: z.array(z.string())
})

export const AdminSettingsSchema = z.object({
    tagList: z.array(z.string().min(1, { message: "Tag must be more than zero characters."})),
    defaultInviteMessage: z.string().min(1, { message: "Default invite message is required." }),
    defaultAcceptMessage: z.string().min(1, { message: "Default accept message is required." }),
    defaultDeclineMessage: z.string().min(1, { message: "Default decline message is required." }),
})

export const ProfileSchema = z.object({
    firstname: z.string().min(1, { message: "First name is required" }),
    lastname: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email" }),
    pronouns: z.string().min(1, { message: "Pronouns are required" }),
    phonenum: z.string().min(1, { message: "Phone number is required" }),
    about: z.string().min(1, { message: "About is required" }),
    tags: z.array(z.string())
})