/*
  Warnings:

  - You are about to drop the column `title` on the `documents` table. All the data in the column will be lost.
  - Added the required column `fileName` to the `documents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `documents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "documents" DROP COLUMN "title",
ADD COLUMN     "fileName" TEXT NOT NULL,
ADD COLUMN     "size" INTEGER NOT NULL;
