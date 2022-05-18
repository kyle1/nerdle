// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/puzzles/date/:date
export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const date = req.query.date.toString();
  const puzzle = await prisma.puzzle.findFirst({
    where: {
      puzzleDate: new Date(date),
    },
    include: {
      guesses: {
        where: {
          userId: 1, //todo
        },
      },
      results: {
        where: {
          userId: 1, //todo
        },
      },
    },
  });
  res.status(200).json(puzzle);
}
