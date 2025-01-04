"use client"

import { Alert } from "@/components/Alert";
import Button from "@/components/Button";
import { Input } from "@/components/FormInput/IconInput";
import Typography from "@/components/Typography";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function UpdatePassword() {
    const [formData, setFormData] = useState({ oldPassword: "", newPassword: "", confirmNewPassword: "" })
    const [error, setError] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await fetch('/api/updatepassword', {
            method: "POST",
            body: JSON.stringify(formData)
        })
        if (res.ok) {
            signOut()
        } else {
            const data = await res.json()
            setError(data.error)
        }
    }

    return (
        <>
            <form className="m-4 space-y-2 max-w-[500px]" onSubmit={onSubmit}>
                <div>
                    <Typography variant="h2"> Update Password </Typography>
                </div>
                <div className="space-y-2">
                    <div>
                        <Input
                            icon="password"
                            value={formData.oldPassword}
                            onChange={handleChange}
                            type="password"
                            name="oldPassword"
                            placeholder="Current Password"
                        />
                    </div>
                    <div>
                        <Input
                            icon="password"
                            value={formData.newPassword}
                            onChange={handleChange}
                            type="password"
                            name="newPassword"
                            placeholder="New Password"
                        />
                    </div>
                    <div>
                        <Input
                            icon="password"
                            value={formData.confirmNewPassword}
                            onChange={handleChange}
                            type="password"
                            name="confirmNewPassword"
                            placeholder="Confirm New Password"
                        />
                    </div>
                </div>
                {
                    error &&
                    <Alert variant="danger">
                        {error}
                    </Alert>
                }
                <div>
                    <Button type="submit">Update Password</Button>
                </div>
            </form>

        </>


    )
}