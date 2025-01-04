"use client"

import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TagInput from "../../../components/FormInput/TagInput";
import ImageUpload from "../../../components/FormInput/ImageUpload";
import { Input } from "../../../components/FormInput/Input";
import z from 'zod'
import { TextArea } from "../../../components/FormInput/TextArea";
import { PhoneInput } from "@/components/FormInput/PhoneInput";
import { BioDataSchema } from "@/lib/schema";
import { validateData } from "@/lib/validation";
import { Alert } from "@/components/Alert";
import { fields } from "./formFields";

type BioData = z.infer<typeof BioDataSchema>

const defaultFormData: BioData = {
    firstname: '',
    lastname: '',
    image: '',
    pronouns: '',
    phonenum: '',
    about: '',
    tags: []
}

interface BioFormProps {
    id: number
}

export default function BioForm({ id } : BioFormProps) {
    const router = useRouter()
    const [formData, setFormData] = useState<BioData>(defaultFormData)
    const [formError, setFormError] = useState({})
    const [error, setError] = useState("")

    useEffect(() => {
        setFormError(validateData(formData, BioDataSchema))
    }, [formData])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(formData => {
            return ({
                ...formData,
                [e.target.name]: e.target.value
            })
        })
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
    }

    const submitForm = async () => {
        const validationResult = BioDataSchema.safeParse(formData);
        if (!validationResult.success) {
            setError(validationResult.error.errors[0].message);
            return
        } else {
            fetch('/api/profile?id=' + id, { method: 'PATCH', body: JSON.stringify(formData) })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        setError(data.error)
                    } else {
                        router.push('/main/home')
                    }
                })
                .catch(err => {
                    setError("An error occurred, please try again later")
                })
        }
    }

    return (
        <form onSubmit={onSubmit} className="p-4 space-y-3">
            <div className="grid grid-cols-5 w-full space-y-3">
                {
                    fields.map((field, index) => (
                        <div key={index} className={`col-span-${field['columns']} row-span-${field['rows']}`}>
                            {field['type'] === 'image' &&
                                <ImageUpload
                                    image={!!formData[field['name'] as keyof BioData] ? formData[field['name'] as keyof BioData] as string : ""}
                                    setImage={(image: string) => { setFormData(formData => ({ ...formData, [field['name']]: image })) }}
                                />
                            }
                            {field['type'] === 'text' &&
                                <Input
                                    className="w-full py-2"
                                    placeholder={field['label']}
                                    name={field['name']}
                                    value={formData[field['name'] as keyof BioData]}
                                    onChange={handleChange}
                                    error={field['name'] in formError}
                                />
                            }
                            {field['type'] === 'textarea' &&
                                <TextArea
                                    name={field['name']}
                                    placeholder={field['label']}
                                    value={formData[field['name'] as keyof BioData]}
                                    onChange={handleChange}
                                    error={field['name'] in formError}
                                />
                            }
                            {field['type'] === 'phone' &&
                                <PhoneInput
                                    placeholder={field['label']}
                                    defaultCountry="US"
                                    value={formData[field['name'] as keyof BioData] as string}
                                    onChange={(value: any) => setFormData(formData => ({ ...formData, [field['name']]: value }) as BioData)}
                                    error={field['name'] in formError}
                                />
                            }
                            {field['type'] === 'tag' &&
                                <div className="mt-1 py-2 pl-2 pr-3 block w-full border border-black rounded-md shadow-sm focus:outline-none focus:border-primarydarkblue focus:ring focus:ring-[#bfdbfe] transition duration-200 placeholder-[#1E2A78] text-base text-med font-inter text-black min-h-[100px]">
                                    <div className="text-[#1E2A78] pl-1">Identities</div>
                                    <TagInput
                                        tags={!!formData[field['name'] as keyof BioData] ? formData[field['name'] as keyof BioData] as string[] : []}
                                        setTags={(tags: string[]) => { setFormData(formData => ({ ...formData, [field['name']]: tags })) }}
                                    />
                                </div>
                            }
                        </div>
                    ))
                }
            </div>

            {error && <Alert> {error} </Alert>}

            <div className="flex-row flex items-center justify-center w-full">
                <Button type="button" onClick={submitForm}>Finish</Button>
            </div>
        </form>
    )
}