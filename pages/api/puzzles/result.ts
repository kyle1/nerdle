// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST /api/puzzles/result
export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const result = await prisma.puzzleResult.create({
    data: {
      ...req.body,
    },
  });
  res.status(200).json(result);
}
