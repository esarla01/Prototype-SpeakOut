"use client"

import React, { useState } from "react";
import AdminSettingsEdit from "./AdminSettingsEdit";
import AdminSettingsView from "./AdminSettingsView";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import { AdminSetting } from "@/lib/types";
import EditIcon from "@/components/icons/EditIcon";
import { useRouter } from "next/navigation";

interface AdminSettingsProps {
    tagsList: string[];
    defaultMessages: { speakerInvite: string; speakerAccept: string; speakerReject: string; };
}

export default function AdminSettings({ tagsList, defaultMessages }: AdminSettingsProps) {
    const router = useRouter();
    const [editable, setEditable] = useState(false);
    const [formData, setFormData] = React.useState<AdminSetting>({
        tagList: tagsList,
        defaultInviteMessage: defaultMessages.speakerInvite,
        defaultAcceptMessage: defaultMessages.speakerAccept,
        defaultDeclineMessage: defaultMessages.speakerReject,
    });

    const saveData = async () => {
        const res = await fetch("/api/adminsettings", {
            method: "PUT",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (res.ok) {
            setEditable(false);
            router.refresh();
        } else {
            alert("Failed to save data")
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center">
                <Typography variant="h1"> Admin Settings </Typography>
                <div>
                    {
                        editable && <Button variant="secondary" onClick={saveData}>Save</Button>
                    }
                    {
                        !editable && 
                            <Button 
                                variant="outline-grey" 
                                onClick={() => setEditable(!editable)}
                            >
                                <EditIcon/> Edit
                            </Button>
                    }
                </div>
            </div>

            {editable ? 
                <AdminSettingsEdit formData={formData} setFormData={setFormData} /> : 
                <AdminSettingsView formData={formData} />
            }
        </div>
    )
}