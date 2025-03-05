/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `authors` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[usename]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `authors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usename` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "authors" ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "usename" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "authors_username_key" ON "authors"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_usename_key" ON "users"("usename");
