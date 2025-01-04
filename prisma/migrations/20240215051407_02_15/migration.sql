/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "about" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "firstname" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "lastname" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "pronouns" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "tags" TEXT[],
ALTER COLUMN "email" SET NOT NULL;

-- CreateTable
CREATE TABLE "Engagement" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "image" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "tags" TEXT[],

    CONSTRAINT "Engagement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ConfirmedSpeakers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PendingSpeakers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ConfirmedSpeakers_AB_unique" ON "_ConfirmedSpeakers"("A", "B");

-- CreateIndex
CREATE INDEX "_ConfirmedSpeakers_B_index" ON "_ConfirmedSpeakers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PendingSpeakers_AB_unique" ON "_PendingSpeakers"("A", "B");

-- CreateIndex
CREATE INDEX "_PendingSpeakers_B_index" ON "_PendingSpeakers"("B");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConfirmedSpeakers" ADD CONSTRAINT "_ConfirmedSpeakers_A_fkey" FOREIGN KEY ("A") REFERENCES "Engagement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConfirmedSpeakers" ADD CONSTRAINT "_ConfirmedSpeakers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PendingSpeakers" ADD CONSTRAINT "_PendingSpeakers_A_fkey" FOREIGN KEY ("A") REFERENCES "Engagement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PendingSpeakers" ADD CONSTRAINT "_PendingSpeakers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
