import React from "react"
import Navbar from "./Navbar";
import { getSelf } from "@/lib/db/utils";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getSelf()
  if (!user) throw new Error("User not found")

  return (
    <>
      <Navbar user={user}>
        <main className="px-10 py-10 w-full h-full border-box lg:px-20">
          {children}
        </main>
      </Navbar>
    </>
  )
}
