import React, { Dispatch, SetStateAction } from 'react';
import Typography from "@/components/Typography";
import EditIcon from "@/components/icons/EditIcon";
import { UserNoPassword } from '@/lib/types';
import Avatar from '@/components/Avatar';
import IdentityTag from '@/components/IdentityTag';
import Button from '@/components/Button';

interface NonEditableProfileProps {
  userData: UserNoPassword,
  setEditable: Dispatch<SetStateAction<boolean>>,
}

export function NonEditableProfile({ userData, setEditable }: NonEditableProfileProps) {
  return (
    <div className='space-y-4'>
      <div className='flex justify-between'>
        <div className="flex items-center">
          <Avatar image={!!userData.image ? userData.image : "/images/engagement-default.jpeg"} />
          <div className="ml-2 flex flex-col  lg:flex-row ">
            <div className="pl-3 font-medium">
              <Typography variant="h1">
                {userData["firstname"]} {userData["lastname"]}
              </Typography>
            </div>
            <div className="pl-3 pt-4 font-semibold">
              <Typography variant="h3">{userData["pronouns"]}</Typography>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <Button variant='outline-grey' onClick={() => { setEditable(true) }}>
            <EditIcon />
            <div>
              <Typography variant="p1">Edit</Typography>
            </div>
          </Button>
        </div>
      </div>

      <div className='space-y-2'>
        <div className='space-y-1'>
          <div className="text-[#1E2A78] font-semibold">
            <Typography variant="h3">Account Settings</Typography>
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <div className="pl-2 font-semibold"><Typography variant="p1"> Email:  </Typography></div>
              <Typography variant="p1"> {userData["email"]} </Typography>
            </div>
            <div className="flex items-center space-x-1">
              <div className="pl-2 font-semibold"><Typography variant="p1"> Phone Number: </Typography></div>
              <Typography variant="p1"> {userData["phonenum"]} </Typography>
            </div>
          </div>
        </div>

        <div className='space-y-1'>
          <div className="text-[#1E2A78] font-semibold">
            <Typography variant="h3" > About </Typography>
          </div>
          <div className="pl-2">
            <p className='break-words'>
              {userData["about"]}
            </p>
          </div>
        </div>

        <div className='space-y-1'>
          <div className="text-[#1E2A78] font-semibold">
            <Typography variant="h3" > Identities </Typography>
          </div>
          <div className="flex">
            {userData.tags.map((tag, index) => (
              <IdentityTag key={index} label={tag} />
            ))}
          </div>
        </div>

        
      </div>
    </div>
  )
}
