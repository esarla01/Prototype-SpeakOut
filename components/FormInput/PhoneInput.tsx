import { cn } from "@/lib/utils"
import React from "react"
import Input, { Props } from "react-phone-number-input/input";

interface PhoneInputProps extends Props<any> {
    error?: boolean
}

const inputVariants = {
    "valid": 'w-full py-2 px-3 inline-block border placeholder-[#1E2A78] border-black rounded-md shadow-sm focus:outline-none focus:border-primarydarkblue focus:ring focus:ring-[#bfdbfe] transition duration-200 text-base flex-center',
    "error": 'w-full py-2 px-3 inline-block border border-red-500 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-[#bfdbfe] transition duration-200 text-base flex-center bg-error-icon bg-no-repeat bg-input-error-size bg-input-error-pos',
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(({ className, error, ...props }, ref) => {
    return (
        <>
            <Input
                className={inputVariants[error ? "error" : "valid"] + " " + cn(className)}
                {...props}
            />
        </>

    )
})
PhoneInput.displayName = "PhoneInput"

export { PhoneInput }