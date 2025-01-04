'use client'

import React from "react";
import Typography from "@/components/Typography";
import { TextArea } from "@/components/FormInput/TextArea";
import { AdminSettingsSchema } from "@/lib/schema";
import { z } from "zod";
import TagInput from "@/components/FormInput/TagInput";
import { AdminSetting } from "@/lib/types";

interface AdminSettingsEditProps {
    formData: AdminSetting;
    setFormData: React.Dispatch<React.SetStateAction<z.infer<typeof AdminSettingsSchema>>>;
}

export default function AdminSettingsEdit({ formData, setFormData }: AdminSettingsEditProps) {
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData((formData) => {
            return {
                ...formData,
                [event.target.name]: event.target.value,
            };
        });
    };

    return (
        <>
            <div className="flex flex-col justify-start my-4 text-[#1E2A78] font-semibold">
                <Typography variant="h3"> Tags </Typography>
                <div className="mt-3 mb-3 flex flex-wrap border border-black w-full rounded-md px-2 py-2 focus:outline-none focus:border-[#7481D6] bg-white ">
                    <TagInput
                        tags={formData.tagList}
                        setTags={(tags: string[]) => { setFormData({ ...formData, tagList: tags }) }}
                        useDropdown={false}
                    />
                </div>

                <Typography variant="h3"> Default Messages </Typography>
                <Typography variant="h4"> Speaker Invite </Typography>
                <TextArea
                    name={"defaultInviteMessage"}
                    className="font-normal"
                    value={formData.defaultInviteMessage}
                    onChange={handleChange}
                />
                <Typography variant="h4"> Speaker Accept </Typography>
                <TextArea
                    name="defaultAcceptMessage"
                    className="font-normal"
                    value={formData.defaultAcceptMessage}
                    onChange={handleChange}
                />
                <Typography variant="h4"> Speaker Reject </Typography>
                <TextArea
                    name="defaultDeclineMessage"
                    className="font-normal"
                    value={formData.defaultDeclineMessage}
                    onChange={handleChange}
                />
            </div>
        </>
    );
}