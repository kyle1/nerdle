// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST /api/puzzles/guess
export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const guess = await prisma.puzzleGuess.create({
    data: {
      ...req.body,
    },
  });
  res.status(200).json(guess);
}
