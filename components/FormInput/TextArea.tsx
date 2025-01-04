import React from "react"
import { cn } from '@/lib/utils'

export interface InputProps
    extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    error?: boolean
}

const TextArea = React.forwardRef<HTMLTextAreaElement, InputProps>(({ className, error, ...props }, ref) => {
    const inputVariants = {
        "valid": 'mt-1 py-2 px-3 block w-full border border-black rounded-md shadow-sm focus:outline-none focus:border-primarydarkblue focus:ring focus:ring-[#bfdbfe] transition duration-200 placeholder-[#1E2A78] text-base overflow-y-auto text-med font-inter text-black min-h-[100px]',
        "error": 'mt-1 py-2 px-3 block w-full border border-red-500 rounded-md shadow-sm focus:outline-none focus:border-primarydarkblue focus:ring focus:ring-[#bfdbfe] transition duration-200 text-base overflow-y-auto text-med font-inter text-black min-h-[100px]',
    }

    return (
        <>
            <textarea
                className={cn(inputVariants[error ? "error" : "valid"], className)}
                {...props}
            />
        </>

    )
})
TextArea.displayName = "TextArea"

export { TextArea }