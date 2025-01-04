import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline-grey" | "outline-white" | "outline-blue";
  onClick?: () => void;
  children?: ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

export default function Button({ variant = "primary", onClick, children, className, disabled = false, ...props }: ButtonProps) {
  const inputVariants = {
    "enabled":
    {
      'primary': 'bg-primarydarkblue hover:bg-primarydarkbluehover rounded-full px-12 py-2 text-white ',
      'secondary': 'bg-primarylightblue hover:bg-[#5b81fc] active:bg-[#4c75fc] px-8 py-2 rounded-full text-white text-sm font-sans font-medium',
      'outline-grey': 'text-[#000000] rounded-full bg-[#F0F0F0] hover:bg-[#e8e8e8] active:bg-[#d5d5d5] border border-black flex items-center justify-center w-20 p-1',
      'outline-white': 'bg-white hover:bg-[#F0F0F0] active:bg-[#e8e8e8] rounded-[20px] border border-[#888] px-5 py-2 flex items-center justify-center',
      'outline-blue': 'text-[#11173D] border-[#11173D] border-[1px] border-solid rounded-full px-4 py-1 text-black hover:bg-[#F0F0F0] active:bg-[#e8e8e8] active:bg-[#e5e7eb] bg-[#EBEEFF]',
      
    },
    "disabled":
    {
      'primary': 'rounded-full px-4 py-1 text-black hover:bg-[#d1d5db] active:bg-[#e5e7eb]',
      'secondary': 'bg-[#7595FF] px-8 py-2 rounded-full text-white text-sm font-sans font-medium',
      'outline-grey': 'border border-[#d1d5db] rounded-full px-4 py-1 text-[#d1d5db]',
      'outline-white': 'bg-white rounded-[20px] border border-[#888] text-[#888] px-5 py-2 flex items-center justify-center',
      'outline-blue': 'text-[#11173D] border-[#11173D] border-[1px] border-solid rounded-full px-4 py-1 text-black bg-[#a2a4a9]',
    }
  }
  return (
    <button 
      className={cn(`${inputVariants[disabled? "disabled" : "enabled"][variant]}`, className)} 
      onClick={onClick} 
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
