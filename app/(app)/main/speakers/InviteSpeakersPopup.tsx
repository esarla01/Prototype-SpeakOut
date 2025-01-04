import { Alert } from "@/components/Alert";
import Button from "@/components/Button";
import PopupModal from "@/components/EngagementPopup/PopupModal";
import { Input } from "@/components/FormInput/Input";
import { TextArea } from "@/components/FormInput/TextArea";
import Typography from "@/components/Typography";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface InviteSpeakersPopupProps {
    onClose: () => void;
}

export default function InviteSpeakersPopup({ onClose }: InviteSpeakersPopupProps) {
    const [formData, setFormData] = useState({ message: "Welcome to SpeakOUT Boston!", role: "Speaker", email: "" })
    const [error, setError] = useState("")
    const router = useRouter()
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const inviteUsers = async () => {
        const res = await fetch('/api/users/invite', {
            method: "POST",
            body: JSON.stringify(formData),
        })
        if (res.ok) {
            onClose()
            router.refresh()
        } else {
            const data = await res.json()
            console.log(error)
            setError(data.error)
        }
    }

    return (
        <PopupModal onClose={onClose}>
            <div className="space-y-3">
                <Typography variant="h2"> Invite Speaker </Typography>
                <TextArea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Invite message"
                />
                <div className="flex space-x-2">
                    <Input
                        type="email"
                        name="email"
                        className="flex-grow"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                    <select
                        className="border border-black rounded-md p-2"
                        value={formData.role}
                        onChange={e => setFormData(prev => ({ ...prev, role: e.target.value }))}
                        name="role"
                    >
                        <option>Speaker</option>
                        <option>Admin</option>
                    </select>
                    <Button
                        onClick={inviteUsers}
                        variant="primary"
                    >
                        Invite
                    </Button>
                </div>
                {
                    error &&
                    <Alert>
                        {error}
                    </Alert>
                }
            </div>
        </PopupModal>
    )
}