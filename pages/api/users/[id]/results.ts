// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const id = Number(req.query.id);
  if (isNaN(id)) {
    res.status(400).json({ message: `User ID must be a number.` });
  } else {
    let results = await prisma.puzzleResult.findMany({
      where: {
        userId: id,
      },
    });
    if (results) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ message: `User with ID ${id} not found.` });
    }
  }
}
