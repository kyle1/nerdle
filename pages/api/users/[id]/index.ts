// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type User = {
  id: number;
  name: string;
  password: string;
};

// GET /api/users/:id
export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const id = Number(req.query.id);
  if (isNaN(id)) {
    res.status(400).json({ message: `User ID must be a number.` });
  } else {
    const user = await prisma.users.findUnique({
      where: {
        id: id,
      },
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: `User with ID ${id} not found.` });
    }
  }
}

//const createUser = (user: User) => {};

const getUser = (id: number): User | null => {
  const user = {
    id: id,
    name: "Kyle",
    password: "abc123",
  };

  return user;
};
