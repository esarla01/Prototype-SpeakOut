import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";
import { getUsers, isAdmin } from "@/lib/db/utils";

// admin only
export async function GET(request: Request) {
  if (!(await isAdmin())) {
    return new NextResponse(null, { status: 401 });
  }
  const users = await getUsers();
  return NextResponse.json(users);
}

/* Delete an Existing User and its Notifications */
// admin only
export async function DELETE(request: Request) {
  if (!(await isAdmin())) {
    return new NextResponse(null, { status: 401 });
  }

  const url = new URL(request.url);
  const user_Id = url.searchParams.get("id");

  if (!user_Id) {
    return new NextResponse(
      JSON.stringify({ error: "No ID provided for deletion of a user!" }),
      { status: 400, }
    );
  }

  try {
    const deleteUser = prisma.user.delete({
      where: {
        id: parseInt(user_Id),
      },
    });
    const deleteNotifications = prisma.notification.deleteMany({
      where: {
        userId: parseInt(user_Id),
      },
    });
    await prisma.$transaction([
      deleteNotifications,
      deleteUser,
    ]);
    return new NextResponse(
      JSON.stringify({message: "success"}),
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code == "P2025") {
      return new NextResponse(
        JSON.stringify({ error: "User not found with the provided ID" }),
        { status: 404, }
      );
    } else {
      return new NextResponse(
        JSON.stringify({ error: "An unknown error occurred while deleting the user." }),
        { status: 500, }
      );
    }

  }

}

