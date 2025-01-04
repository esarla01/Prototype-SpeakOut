import { cn } from "@/lib/utils"

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'success'
}

export const Alert: React.FC<AlertProps> = ({ children, variant='danger', className, ...props }) => {
    const classes: { [key: string]: string } = {
        'primary': 'bg-[#cce5ff] text-[#004085] border-[#b8daff]',
        'secondary': 'bg-[#e2e3e5] text-[#383d41] border-[#d6d8db]',
        'danger': 'bg-[#f8d7da] text-[#721c24] border-[#f5c6cb]',
        'success': 'bg-[#D4EDDA] text-[#155724] border-[#c3e6cb]',
    }

    return (
        <div className={cn('p-2 rounded border', classes[variant], className)} role="alert" {...props}>
            {children}
        </div>
    )
}