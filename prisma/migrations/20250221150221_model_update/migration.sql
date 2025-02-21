/*
  Warnings:

  - You are about to drop the column `score` on the `GameSession` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `GameSession` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `scores` to the `GameSession` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GameSession" DROP CONSTRAINT "GameSession_userId_fkey";

-- AlterTable
ALTER TABLE "GameSession" DROP COLUMN "score",
DROP COLUMN "userId",
ADD COLUMN     "players" TEXT[],
ADD COLUMN     "scores" JSONB NOT NULL;

-- DropTable
DROP TABLE "User";
