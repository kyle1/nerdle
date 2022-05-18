// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type User = {
  id: number;
  name: string;
  password: string;
};

// GET /api/users
export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === "GET") {
    const users = await prisma.users.findMany();
    res.status(200).json(users);
  } else if (req.method === "POST") {
    const result = await prisma.users.create({
      data: {
        ...req.body,
      },
    });
    res.json(result);
  }
}
