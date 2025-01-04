'use client'

import React from "react";
import Typography from "@/components/Typography";
import IdentityTag from "@/components/IdentityTag";
import { AdminSetting } from "@/lib/types";

interface AdminSettingsViewProps {
    formData: AdminSetting;
}

export default function AdminSettingsView({ formData }: AdminSettingsViewProps) {
    return (
        <>
            <div className="flex flex-col justify-start my-4 text-[#1E2A78] font-semibold">

                <Typography variant="h3"> Tags </Typography>
                <div className="mt-3 mb-3 flex flex-wrap border border-black w-full rounded-md px-2 py-2 focus:outline-none focus:border-[#7481D6] bg-white ">
                    {formData.tagList.map((tag, index) => (
                        <IdentityTag
                            key={index}
                            label={tag}
                        />
                    ))}
                </div>

                <Typography variant="h3"> Default Messages </Typography>
                <div className="space-y-2">
                    <div>
                        <Typography variant="h4"> Speaker Invite </Typography>
                        <p className="w-full bg-white border text-black font-normal border-black rounded p-2">
                            {formData.defaultInviteMessage}
                        </p>
                    </div>

                    <div>
                        <Typography variant="h4"> Speaker Accept </Typography>
                        <p className="w-full bg-white border text-black font-normal border-black rounded p-2">
                            {formData.defaultAcceptMessage}
                        </p>
                    </div>

                    <div>
                        <Typography variant="h4"> Speaker Reject </Typography>
                        <p className="w-full bg-white border text-black font-normal border-black rounded p-2">
                            {formData.defaultDeclineMessage}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}