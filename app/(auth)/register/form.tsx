'use client'
import React, { useState } from 'react'
import Button from '@/components/Button'
import { Input } from '@/components/FormInput/IconInput'
import { signIn } from 'next-auth/react'
import { z } from "zod";
import { passwordRegex } from '@/lib/regex'
import { Alert } from '@/components/Alert'

interface RegistrationData {
    email?: string,
    password?: string,
    repeatPassword?: string,
    accesscode?: string
}

interface RegisterFormProps {
    accesscode: string
}

export const RegisterForm = ({ accesscode } : RegisterFormProps) => {
    const [formData, setFormData] = useState<RegistrationData>({
        email: '',
        password: '',
        repeatPassword: '',
        accesscode: accesscode
    })
    const [error, setError] = useState<string | null>(null)

    const schema = z.object({
        email: z.string().email({ message: 'Must be a valid email' }),
        password: z.string().regex(passwordRegex,
            { message: 'Password must contain 8 characters, including 1 uppercase character, 1 lowercase character, 1 special character, and 1 number.' }),
        repeatPassword: z.string().refine((data) => data === formData.password, { message: 'Passwords do not match' }),
        accesscode: z.string(),
    });

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

        const validationResult = schema.safeParse(formData);
        if (!validationResult.success) {
            setError(validationResult.error.errors[0].message);
            return;
        }

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            if (res.ok) {
                await signIn('credentials', {
                    email: formData.email,
                    password: formData.password,
                    redirect: true,
                    callbackUrl: '/bio'
                })
            } else {
                setError((await res.json()).error)
            }
        } catch (error: any) {
            setError(error?.message)
        }
    }

    return (
        <form className="space-y-2 flex items-center justify-center" onSubmit={onSubmit}>
            <div className="flex-1 grid items-center gap-6 max-w-xs">
                <Input
                    required
                    icon='email'
                    name='email'
                    type='email'
                    placeholder='Email'
                    value={formData['email']}
                    onChange={handleChange}
                />
                <div>
                    <Input
                        required
                        icon='password'
                        name='password'
                        type='password'
                        placeholder='Password'
                        value={formData['password']}
                        onChange={handleChange}
                    />
                    {
                        passwordRegex.test(formData.password || '') ? 
                        null 
                        : 
                        <p className='italic text-sm text-red-700'> Password must contain 8 characters, with 1 uppercase character, 1 lowercase character, 1 special character, and 1 number. </p>
                    }
                </div>
                <Input
                    required
                    icon='password'
                    name='repeatPassword'
                    type='password'
                    placeholder='Repeat Password'
                    value={formData['repeatPassword']}
                    onChange={handleChange}
                />
                <Input
                    required
                    icon='key'
                    name='accesscode'
                    type='text'
                    placeholder='Access Code'
                    value={formData['accesscode']}
                    onChange={handleChange}
                />

                {
                    error && (
                        <Alert>
                            {error}
                        </Alert>
                    )
                }

                <div className='flex justify-center'>
                    <Button type='submit' variant='primary'> Sign Up </Button>
                </div>
            </div>
        </form>
    )
}