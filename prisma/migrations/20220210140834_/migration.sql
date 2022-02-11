/*
  Warnings:

  - You are about to drop the column `slug` on the `Mark` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Mark_authorId_slug_key";

-- AlterTable
ALTER TABLE "Mark" DROP COLUMN "slug";
