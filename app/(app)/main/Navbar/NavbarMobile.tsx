import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useClickAway } from "react-use";

const SidebarElement = ({ icon, text, link, selected, setOpen }: { icon: any, text: string, link: string, selected: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const linkClass = {
        selected: "flex items-center pl-4 p-1 my-4 rounded-lg hover:bg-[#f3f4f6] group text-[#1E2A78] hover:text-[#1E2A78] fill-[#1E2A78] font-bold",
        notSelected: "flex items-center pl-4 p-1 my-4 rounded-lg hover:bg-[#f3f4f6] group text-black hover:text-[#1E2A78] hover:fill-[#1E2A78]"
    }
    
    return (
        <li>
            <Link
                href={link}
                className={linkClass[selected? "selected" : "notSelected"]}
                onClick={() => {setOpen(open => !open)}}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
                    {icon}
                </svg>
                <span
                    className="ml-3"
                >
                    {text}
                </span>
            </Link>
        </li>
    );
}

export default function NavbarMobile({ routes, isOpen, setOpen } : { routes: { icon: any, text: string, link: string }[], isOpen: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const ref = React.useRef(null);
    useClickAway(ref, () => setOpen(false));
    const pathname = usePathname()

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed left-0 shadow-4xl right-0 top-[5.7rem] p-5 bg-white border-b border-b-white/20 shadow-sm rounded-sm"
                >
                    <ul className="grid gap-2">
                        {routes.map(route => {
                            const { icon, text, link } = route;
                            return (
                                <SidebarElement
                                    key={link}
                                    icon={icon}
                                    text={text}
                                    link={link}
                                    selected={pathname.includes(link)}
                                    setOpen={setOpen}
                                />
                            );
                        })}
                    </ul>
                </motion.div>
            )}
        </AnimatePresence>
    )
}