import { redirect } from "next/navigation";
import { getSelf } from "@/lib/db/utils";

export default async function Profile() {
  const user = await getSelf();
  if (user == null) {
    throw new Error("User not found");
  }
  redirect(`/main/profile/${user.id}`)
}