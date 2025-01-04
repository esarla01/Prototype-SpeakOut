import Typography from '@/components/Typography'
import { LoginForm } from './form' 
import Link from 'next/link'
import { radialGradientBackground } from '@/lib/styles'
import Image from 'next/image'

export default function Login() {
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
                    <Typography variant='h2'> Sign In </Typography>
                </div>
                <LoginForm />
                <div className='mt-12 flex items-center justify-center'>
                    <Typography variant="p1"> Don&apos;t have an account? <Link className='font-medium text-[#140222] hover:underline' href='/register'>Sign Up.</Link></Typography>
                </div>
            </div>
        </div>
    )
}