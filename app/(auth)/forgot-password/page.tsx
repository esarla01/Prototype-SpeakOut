"use client"

import Typography from "@/components/Typography";
import { radialGradientBackground } from "@/lib/styles";
import ForgotPasswordForm from "./form";
import { useState } from "react";
import Image from "next/image";
import { Alert } from "@/components/Alert";

export default function ResetPassword() {
    const [showMessage, setShowMessage] = useState(false)

    return (
        <div className="min-h-screen flex justify-center items-center" style={radialGradientBackground}>
            <div className="shadow-xl p-4 bg-white rounded-xl basis-[500px]">
                <div className="flex justify-left items-left w-full rounded-lg">
                    <Image
                        src="images/SpeakOUTLogo.svg"
                        alt="SpeakOUT Logo"
                        width={100}
                        height={100}
                    />
                </div>
                <div className='mb-8 text-center'>
                    <Typography variant='h2'> Forgot Password </Typography>
                </div>
                {
                    showMessage ?
                        <Alert
                            variant="success"
                        >
                            Your password reset request has been received. If an account with the provided email exists, you will receive an email shortly.
                        </Alert>

                        :
                        <ForgotPasswordForm
                            setShowMessage={setShowMessage}
                        />
                }
            </div>
        </div>
    )
}