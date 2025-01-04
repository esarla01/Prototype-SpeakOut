import PopupModal from "./PopupModal";
import AdminEngagementEditForm from "./AdminEngagementEditForm";
import { Dispatch, SetStateAction, useState } from "react";
import { EngagementWithSpeakers, EngagementWithStatus } from "@/lib/types";
import Button from "../Button";
import Typography from "../Typography";
import { EngagementSchema } from "@/lib/schema";
import { Alert } from "../Alert";

interface AdminEngagementCreateProps {
    onClose: () => void;
    setEngagements: Dispatch<SetStateAction<(EngagementWithSpeakers | EngagementWithStatus)[]>>;
}

export default function AdminEngagementCreate({ onClose, setEngagements }: AdminEngagementCreateProps) {
    const [formData, setFormData] = useState<EngagementWithSpeakers>({
        id: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        title: "",
        start: new Date(),
        end: new Date(),
        image: "",
        status: "In-Person",
        tags: [],
        sitename: "",
        address: "",
        description: "",
        capacity: 1,
        confirmedSpeakers: [],
        pendingSpeakers: [],
        rejectedSpeakers: []
    })

    const [error, setError] = useState<string>("")

    const createEvent = () => {
        const validationResult = EngagementSchema.safeParse(formData)
        if (!validationResult.success) {
            setError(validationResult.error.errors[0].message)
            return;
        }

        const { id, createdAt, updatedAt, confirmedSpeakers, pendingSpeakers, rejectedSpeakers, ...rest } = formData;
        fetch('/api/engagements', {
            method: 'POST',
            body: JSON.stringify(rest),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.ok) {
                res.json().then(data => {
                    if (data.error) {
                        setError(data.error);
                        return;
                    }
                    setEngagements(engagements => [...engagements, { ...data, start: new Date(data.start), end: new Date(data.end) }])
                    onClose();
                })
            } else {
                setError("Failed to create event");
            }
        })
    }

    return (
        <PopupModal onClose={onClose}>
            <div className="space-y-2">
                <Typography variant="h2">Create New Event</Typography>
                <AdminEngagementEditForm
                    formData={formData}
                    setFormData={setFormData}
                />
                {error && <Alert>{error}</Alert>}
                <div className="w-full flex justify-center">
                    <Button onClick={createEvent} variant="primary">Create Engagement</Button>
                </div>
            </div>
        </PopupModal>
    )
}