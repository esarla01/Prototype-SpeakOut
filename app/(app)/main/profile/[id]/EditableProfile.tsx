import React, { Dispatch, SetStateAction, useState } from "react";
import Typography from "@/components/Typography";
import { UserNoPassword } from "@/lib/types";
import TagInput from "@/components/FormInput/TagInput";
import ImageUpload from "@/components/FormInput/ImageUpload";
import { Input } from "@/components/FormInput/Input";
import Button from "@/components/Button";
import { Alert } from "@/components/Alert";
import { ProfileSchema } from "@/lib/schema";
import { useRouter } from "next/navigation";
 
interface Props {
  userData: UserNoPassword;
  setUserData: Dispatch<SetStateAction<UserNoPassword>>;
  setEditable: Dispatch<SetStateAction<boolean>>;
}

export default function EditableProfile({
  userData,
  setUserData,
  setEditable,
}: Props) {
  const router = useRouter()
  const [error, setError] = useState("")
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((userData) => {
      return {
        ...userData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const updateUser = async () => {
    const validationResult = ProfileSchema.safeParse(userData);
    if (!validationResult.success) {
      setError(validationResult.error.errors[0].message);
      return
    }
    const res = await fetch("/api/profile?id=" + userData.id, {
      method: "PATCH",
      body: JSON.stringify(userData),
    });
    const data = await res.json()
    if (!res.ok) {
      setError(data.error)
    } else {
      setEditable(false)
      router.refresh()
    }
  };

  return (
    <div>
      <div className="float-right">
        <Button variant="secondary" onClick={updateUser}>
          <div>
            <Typography variant="p1">Save</Typography>
          </div>
        </Button>
      </div>
      <div className="flex flex-row justify-between">

        <div className="flex flex-col lg:flex-row lg:space-y-0 items-center space-y-2">
          <div>
            <ImageUpload
              image={userData.image}
              setImage={(image) => setUserData({ ...userData, image: image })}
            />
          </div>
          <div className="ml-2 flex flex-col xl:flex-row xl:space-y-0 space-y-2 xl:space-x-3">
            <Input
              className="font-large py-2"
              name="firstname"
              value={userData["firstname"]}
              onChange={handleChange}
            />
            <Input
              className="font-large py-2"
              name="lastname"
              value={userData["lastname"]}
              onChange={handleChange}
            />
            <Input
              className="font-large py-2 lg:max-w-[100px]"
              name="pronouns"
              value={userData["pronouns"]}
              onChange={handleChange}
            />
          </div>
        </div>

      </div>

      <div className="text-[#1E2A78] font-semibold">
        <Typography variant="h3">Account Settings</Typography>
      </div>
      <div className="space-y-2">
        <div className="flex items-centerspace-x-1">
          <div className="text-[#000000] rounded bg-[#FFFFFF] border border-black flex items-center justify-left w-full p-2 text-bold">
            <div className="pl-2 font-semibold">
              <Typography variant="p1"> Email: </Typography>
            </div>
            {userData && (
              <input
                type="email"
                name="email"
                className="w-full p-2"
                value={userData["email"]}
                onChange={handleChange}
              />
            )}
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <div className="text-[#000000] rounded bg-[#FFFFFF] border border-black flex items-center justify-left w-full p-2 text-bold">
            <div className="pl-2 font-semibold">
              <Typography variant="p1"> Phone Number: </Typography>
            </div>
            {userData && (
              <input
                type="phonenum"
                className="w-full p-2"
                value={userData["phonenum"]}
                name="phonenum"
                onChange={handleChange}
              />
            )}
          </div>
        </div>
      </div>

      <div className="my-4 text-[#1E2A78] font-semibold">
        {" "}
        <Typography variant="h3"> About </Typography>
      </div>
      <div className="text-[#000000] rounded bg-[#FFFFFF] border border-black flex items-center justify-between w-full p-2 text-bold">
        {userData && (
          <input
            type="about"
            className="w-full"
            value={userData["about"]}
            name="about"
            onChange={handleChange}
          />
        )}
      </div>
      <div className="my-4 text-[#1E2A78] font-semibold">
        {" "}
        <Typography variant="h3"> Personal Identity Tags </Typography>
      </div>
      <div className="flex items-center my-2 space-x-1 text-[#000000] rounded bg-[#FFFFFF] border border-black w-full p-2 text-bold">
        <TagInput
          tags={userData.tags}
          setTags={(tags: string[]) => {
            setUserData({ ...userData, tags: tags });
          }}
        />
      </div>

      {error &&
        <Alert variant="danger">
          {error}
        </Alert>
      }

    </div>
  );
}