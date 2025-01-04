"use client"

import Typography from "@/components/Typography";
import { radialGradientBackground } from "@/lib/styles";
import { useSearchParams } from "next/navigation";
import ResetPasswordForm from "./form";
import Image from "next/image";

export default function ResetPassword() {
    const searchParams = useSearchParams()
    const code = searchParams.get("code");

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
                    <Typography variant='h2'> Reset Password </Typography>
                </div>
                <ResetPasswordForm code={code || ''} />
            </div>
        </div>
    )
}