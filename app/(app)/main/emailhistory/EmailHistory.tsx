"use client"

import Typography from "@/components/Typography";
import { Email } from "@prisma/client";
import { useState } from "react";
import EmailHistoryPopup from "./EmailHistoryPopup";

interface EmailHistoryProps {
    emails: Email[]
}

export default function EmailHistory({ emails }: EmailHistoryProps) {
    const [emailPopup, setEmailPopup] = useState<Email | null>(null)

    return (
        <>
            <Typography variant="h1">Email History</Typography>
            <div className="relative overflow-x-auto shadow sm:rounded-lg bg-white ">
                {
                    emails.length === 0 && (
                        <div className="text-center p-4">
                            No emails sent
                        </div>
                    )
                }
                {
                    emails.length > 0 && (
                        <table className="w-full text-sm text-left rtl:text-right">
                            <thead className="uppercase border-b border-b-1">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Subject
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Recipients
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    emails.map((email, index) => (
                                        <tr
                                            className="border-b hover:bg-[#eee] cursor-pointer"
                                            onClick={() => setEmailPopup(email)}
                                            key={index}
                                        >
                                            <td className="px-6 py-4">
                                                {email.subject}
                                            </td>
                                            <td className="px-6 py-4">
                                                {email.recipients.join(", ")}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    )
                }
            </div>

            {emailPopup &&
                <EmailHistoryPopup
                    email={emailPopup}
                    onClose={() => setEmailPopup(null)}
                />
            }
        </>
    )
}