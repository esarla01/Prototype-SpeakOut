"use client"

import Avatar from "@/components/Avatar";
import { useOutsideClick } from "@/lib/hooks";
import { UserNoPassword } from "@/lib/types";
import Link from "next/link";
import React from "react";

interface NavbarDropdownProps {
    user: UserNoPassword;
    options: { name: string, link: string }[];
}

export default function NavbarDropdown({ user, options }: NavbarDropdownProps) {
    const [settingsOpen, setSettingsOpen] = React.useState<boolean>(false)
    const ref = React.useRef(null)
    const onClose = () => setSettingsOpen(false)
    useOutsideClick(ref, onClose)

    return (
        <div className="cursor-pointer" ref={ref}>
            <span onClick={() => setSettingsOpen(settingsOpen => !settingsOpen)}>
                <Avatar image={!!user.image ? user.image : "/images/SpeakOUTLogo.svg"} />
            </span>
            {settingsOpen &&
                <div className="absolute top-18 z-10 right-6 bg-white shadow border-[#9D9FA2] rounded-lg py-2 min-w-[200px]">
                    {
                        options.map(options => (
                            <Link 
                                href={options.link} 
                                key={options.name} 
                                onClick={onClose}
                                prefetch={false}
                            >
                                <div className="hover:cursor-pointer hover:bg-[#F3F4F6] px-3 py-2 rounded-lg">{options.name}</div>
                            </Link>
                        ))
                    }
                </div>
            }
        </div>

    )
}