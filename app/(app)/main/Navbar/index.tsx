"use client"
import NavbarDesktop from '@/app/(app)/main/Navbar/NavbarDesktop';
import NavbarMobile from '@/app/(app)/main/Navbar/NavbarMobile';
import { UserNoPassword } from '@/lib/types';
import Hamburger from 'hamburger-react';
import React from 'react';
import { adminRoutes, speakerRoutes } from './routes';
import NavbarDropdown from './NavbarDropdown';
import { Role } from '@prisma/client';
import { adminOptions, speakerOptions } from './menuoptions';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar({ user, children }: { user: UserNoPassword, children: React.ReactNode }) {
    const [isOpen, setOpen] = React.useState<boolean>(false);
    const routes = user.role === Role.ADMIN ? adminRoutes : speakerRoutes
    const options = user.role === Role.ADMIN ? adminOptions : speakerOptions

    return (
        <>
            <div className="border border-[#9D9FA2] h-[90px] w-screen bg-white flex justify-between items-center">
                <div className="sm:hidden block">
                    <Hamburger toggled={isOpen} size={20} toggle={setOpen} />
                    <NavbarMobile routes={routes} isOpen={isOpen} setOpen={setOpen} />
                </div>
                <Link href="/main/home">
                    <Image
                        className="mx-4"
                        src="/images/SpeakOUTLogo.svg"
                        alt="SpeakOUT Boston Logo"
                        width={100}
                        height={100}
                    />
                </Link>
                <div className="mx-4 hover:cursor-pointer">
                    <NavbarDropdown
                        user={user}
                        options={options}
                    />
                </div>
            </div>
            <div className="flex bg-[#F3F4F6] h-full">
                <div className="w-64 border-r border-[#9D9FA2] bg-white sm:flex hidden" style={{ minHeight: "calc(100vh - 90px)" }}>
                    <NavbarDesktop routes={routes} />
                </div>
                <div className='flex-grow sm:max-w-layout-body'>
                    {children}
                </div>
            </div>
        </>
    )
}