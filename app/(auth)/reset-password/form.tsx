"use client"

import Button from "@/components/Button";
import { Input } from "@/components/FormInput/IconInput";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import { Alert } from "@/components/Alert";

export default function ResetPasswordForm({ code } : { code: string }) {
    const [error, setError] = useState("")
    const router = useRouter()


    const [formData, setFormData] = useState({
        code: code,
        newPassword: '',
        confirmNewPassword: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(formData => {
            return ({
                ...formData,
                [e.target.name]: e.target.value
            })
        })
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const res = await fetch('/api/resetpassword', {
            method: 'POST',
            body: JSON.stringify(formData),
        })
        const data = await res.json()
        if (res.ok) {
            if (data.error) {
                setError(data.error)
            } else {
                router.push('/login')
            }
        } else {
            setError(data.error || 'An unknown error occurred. Please try again.')
        }
    }

    return (
        <form className="space-y-2 flex items-center justify-center" onSubmit={onSubmit}>
            <div className="flex-1 grid items-center gap-6 max-w-xs">
                <Input
                    required
                    icon='password'
                    name='newPassword'
                    type='password'
                    placeholder='New Password'
                    value={formData['newPassword']}
                    onChange={handleChange}
                />
                <Input
                    required
                    icon='password'
                    name='confirmNewPassword'
                    type='password'
                    placeholder='Confirm New Password'
                    value={formData['confirmNewPassword']}
                    onChange={handleChange}
                />

                {
                    error && (
                        <Alert variant="danger">
                            {error}
                        </Alert>
                    )
                }

                <div className='flex justify-center'>
                    <Button type='submit' variant='primary'> Reset Password </Button>
                </div>
            </div>
        </form>
    )
}