"use client"

import { NonEditableProfile } from "@/app/(app)/main/profile/[id]/NonEditableProfile";
import EditableProfile from "./EditableProfile"
import { useState } from "react";
import { UserNoPassword } from "@/lib/types";

interface UserViewProps {
  user: UserNoPassword,
}

export default function UserView({ user }: UserViewProps) {
  const [editable, setEditable] = useState(false);
  const [userData, setUserData] = useState<UserNoPassword>(user);

  if (!userData) return (<div>Loading...</div>)
  return (
    <>
      {editable ?
        <EditableProfile
          userData={userData}
          setUserData={setUserData}
          setEditable={setEditable}
        /> :
        <NonEditableProfile
          userData={userData}
          setEditable={setEditable}
        />}
    </>
  )
}