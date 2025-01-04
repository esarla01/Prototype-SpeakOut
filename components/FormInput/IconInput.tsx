import React from 'react';
import EmailIcon from '../icons/EmailIcon';
import KeyIcon from '../icons/KeyIcon'
import PasswordIcon from '../icons/PasswordIcon'

import { cn } from '@/lib/utils'

const renderIcon = (label?: string) => {
  const twClass = 'absolute top-1/2 transform -translate-y-1/2 left-2 text-primarydarkblue text-lg '
  if (label === 'email') return <EmailIcon className={twClass} />
  if (label === 'password') return <PasswordIcon className={twClass} />
  if (label === 'key') return <KeyIcon className={twClass} />
  // Add more conditions for other icons if needed
  return null;
};

export interface IconInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { 
    icon?: 'email' | 'password' | 'key'
   }

const Input = React.forwardRef<HTMLInputElement, IconInputProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative">
        {renderIcon(icon)}
        <input
          className={cn('w-full pl-10 pr-2 pt-2 pb-2 inline-block border border-primarydarkblue rounded-md shadow-sm focus:outline-none focus:border-primarydarkblue text-base flex-center', className)}
          {...props}
        />
      </div>
    );
  });
  Input.displayName = 'Input'

  export { Input }