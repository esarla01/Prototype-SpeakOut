import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: 'default' | 'large'
    error?: boolean
}

const base_classes = 'border border-black rounded-md shadow-sm focus:outline-none focus:border-primarydarkblue focus:ring focus:ring-[#bfdbfe] transition duration-200 text-base flex-center w-full px-2 py-1'
const error_classes = 'border border-red-500 rounded-md p-input-error w-full bg-error-icon bg-no-repeat bg-input-error-size bg-input-error-pos'
const large_classes = 'text-[#380D5A] font-medium font-serif text-[20px] w-full border border-black rounded-md px-2 py-1 focus:outline-none focus:border-[#7481D6]'
const large_error_classes = 'text-[#380D5A] font-medium font-serif text-[20px] w-full border border-red-500 rounded-md px-2 py-1 focus:outline-none focus:border-[#7481D6] bg-error-icon bg-no-repeat bg-input-error-size bg-input-error-pos'

const inputVariants = {
    "default": {
        'error': error_classes,
        'base': base_classes
    },
    "large": {
        'error': large_error_classes,
        'base': large_classes
    }
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ variant='default', error, type, className, value, onChange, ...props }, ref) => {
        return (
            <>
                <input
                    className={inputVariants[variant][error ? 'error' : 'base'] + " " + className}
                    type={type}
                    value={value}
                    onChange={onChange}
                    min={1}
                    {...props}
                />
            </>

        );
    });
Input.displayName = 'Input'
export { Input }