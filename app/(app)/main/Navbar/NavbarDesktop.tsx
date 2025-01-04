'use client'

import React from "react";
import { usePathname } from 'next/navigation'
import Link from "next/link";

const SidebarElement = ({ icon, text, link, selected }: { icon: any, text: string, link: string, selected: boolean }) => {
  const liClass = {
    selected: "border-l-4 border-primarydarkblue",
    notSelected: ""
  }
  const linkClass = {
    selected: "flex items-center pl-4 p-1 my-4 rounded-lg hover:bg-[#f3f4f6] group text-primarydarkblue hover:text-primarydarkblue fill-[#1E2A78] w-full",
    notSelected: "flex items-center pl-4 p-1 my-4 rounded-lg hover:bg-[#f3f4f6] group text-black hover:text-primarydarkblue hover:fill-[#1E2A78] w-full"
  }
  
  return (
    <li className={liClass[selected? "selected" : "notSelected"]}>
      <Link
        href={link}
        className={linkClass[selected? "selected" : "notSelected"]}
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
};

export default function NavbarDesktop({ routes } : { routes: { icon: any, text: string, link: string }[] }) {
  const pathname = usePathname()

  return (
    <>
      <aside
        id="default-sidebar"
        className="h-full w-full"
        aria-label="Sidebar"
      >
        <div className="h-full py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {routes.map((item, index) => (
              <SidebarElement
                key={index}
                icon={item.icon}
                text={item.text}
                link={item.link}
                selected={pathname.includes(item.link)}
              />
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}