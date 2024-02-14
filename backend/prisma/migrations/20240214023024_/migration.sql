/*
  Warnings:

  - Added the required column `age` to the `players` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "players" ADD COLUMN     "age" INTEGER NOT NULL;
