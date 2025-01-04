import { EngagementWithSpeakers } from "@/lib/types";
import TagInput from "@/components/FormInput/TagInput";
import StatusDropdown from "./StatusDropdown";
import ImageUpload from "./ImageUpload";
import { useEffect, useState } from "react";
import { validateEnagementData } from "@/lib/validation";
import { Input } from "../FormInput/Input";
import DatePicker from "react-datepicker";
import { detailInputs } from "./formFields";
import { TextArea } from "../FormInput/TextArea";
import { AddressInput } from "../FormInput/AddressInput";

interface AdminEngagementEditFormProps {
    formData: EngagementWithSpeakers;
    setFormData: React.Dispatch<React.SetStateAction<EngagementWithSpeakers>>;
}

export default function AdminEngagementEditForm({ formData, setFormData }: AdminEngagementEditFormProps) {
    const [formError, setFormError] = useState({})

    useEffect(() => {
        setFormError(validateEnagementData(formData))
    }, [formData])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.type === 'number') {
            setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) });
            return;
        }
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <>
            <div className="my-2">
                <div>
                    <span className="text-[20px] text-[#380D5A] font-medium font-serif mb-4">Title</span>
                </div>
                <div>
                    <Input
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                        variant="large"
                        error={'title' in formError}
                    />
                </div>
            </div>

            <div className="my-2">
                <div>
                    <span className="text-[20px] text-[#380D5A] font-medium font-serif mb-4">Details</span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {
                        detailInputs.map((input, index) => (
                            <div key={index} className="grid grid-cols-4 my-1">
                                {input.type === 'empty' &&
                                    <div></div>
                                }

                                {input.type !== 'empty' &&
                                    <>
                                        <div className="col-span-1 text-right pr-2">
                                            <div className="flex flex-row items-center h-full">
                                                <span className="w-full text-right"> {input.label}: </span>
                                            </div>
                                        </div>
                                        <div className="col-span-3">
                                            <div className="flex flex-row items-center h-full">
                                                {(input.type == 'text' || input.type == 'number') &&
                                                    <>
                                                        <Input
                                                            name={input.name}
                                                            value={String(formData[input.name as keyof EngagementWithSpeakers])}
                                                            type={input.type}
                                                            onChange={handleChange}
                                                            error={input.name in formError}
                                                        />
                                                    </>
                                                }
                                                {input.type == 'address' &&
                                                    <AddressInput
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, address: e.target.value })}
                                                        onPlaceSelected={value => setFormData((formData) => ({ ...formData, address: value.formatted_address || '' }))}
                                                        defaultValue={formData.address}
                                                        error={input.name in formError}
                                                    />
                                                }
                                                {input.type == 'date' &&
                                                    <span className="rounded-md border border-black p-1 w-full">
                                                        <DatePicker
                                                            name={input.name}
                                                            wrapperClassName="w-full"
                                                            className="w-full"
                                                            selected={new Date(formData[input.name as keyof EngagementWithSpeakers] as string)}
                                                            onChange={
                                                                (date: Date) => {
                                                                    setFormData({
                                                                        ...formData,
                                                                        end: new Date(Math.max(date.getTime(), new Date(formData.end).getTime())),
                                                                        start: new Date(Math.min(date.getTime(), new Date(formData.start).getTime())),
                                                                        [input.name]: date,
                                                                    })

                                                                }
                                                            }
                                                            timeInputLabel="Time:"
                                                            timeFormat="HH:mm"
                                                            dateFormat="MMMM d, yyyy h:mm aa"
                                                            showTimeSelect
                                                        />
                                                    </span>
                                                }
                                                {input.type === "status" &&
                                                    <StatusDropdown
                                                        status={String(formData[input.name as keyof EngagementWithSpeakers])}
                                                        setStatus={(status: string) => { setFormData({ ...formData, status: status }) }}
                                                    />
                                                }
                                            </div>

                                        </div>
                                    </>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>

            <div>
                <span className="text-[20px] text-[#380D5A] font-medium font-serif mb-4">Description</span>
            </div>
            <div className="mb-4">
                <TextArea
                    placeholder="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    error={'description' in formError}
                />
            </div>
            <div>
                <span className="text-[20px] text-[#380D5A] font-serif font-medium mb-4">Identity Tags</span>
            </div>
            <div className="mt-3 mb-3 flex flex-wrap border border-black w-full rounded-md px-2 py-2 focus:outline-none focus:border-[#7481D6]">
                <TagInput
                    tags={!!formData['tags'] ? formData['tags'] : []}
                    setTags={(tags: string[]) => { setFormData({ ...formData, tags: tags }) }}
                />
            </div>
            <div>
                <span className="text-[20px] text-[#380D5A] font-serif font-medium mb-4">Image</span>
            </div>
            <div className="mt-3 mb-3 flex flex-wrap border border-black w-full rounded-md px-2 py-2 focus:outline-none focus:border-[#7481D6]">
                <ImageUpload
                    image={formData.image}
                    setImage={(image: string) => { setFormData({ ...formData, image: image }) }}
                />
            </div>
        </>
    )
}