/*
  Warnings:

  - Changed the type of `content_type` on the `documents` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "documents" DROP COLUMN "content_type",
ADD COLUMN     "content_type" TEXT NOT NULL;

-- DropEnum
DROP TYPE "ContentType";
