// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Result = {
  id: number;
  userId: number;
  startTime: Date;
  endTime: Date;
  guessCount: number;
  isWin: boolean;

  details: ResultDetail[];
};

type ResultDetail = {
  id: number;
  resultId: number;
  guessTime: Date;
  guessNumber: number;
  guess: string;
  isMatch: boolean;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const id = Number(req.query.id);
  if (isNaN(id)) {
    res.status(400).json({ message: `User ID must be a number.` });
  } else {
    let results: Result[] = [
      {
        id: 1,
        userId: id,
        startTime: new Date(),
        endTime: new Date(),
        guessCount: 4,
        isWin: true,
        details: [
          {
            id: 1,
            resultId: 1,
            guessTime: new Date(),
            guessNumber: 1,
            guess: "great",
            isMatch: false,
          },
          {
            id: 2,
            resultId: 1,
            guessTime: new Date(),
            guessNumber: 2,
            guess: "shine",
            isMatch: false,
          },
          {
            id: 3,
            resultId: 1,
            guessTime: new Date(),
            guessNumber: 3,
            guess: "melon",
            isMatch: false,
          },
          {
            id: 4,
            resultId: 1,
            guessTime: new Date(),
            guessNumber: 4,
            guess: "enjoy",
            isMatch: true,
          },
        ],
      },
      {
        id: 2,
        userId: id,
        startTime: new Date(),
        endTime: new Date(),
        guessCount: 3,
        isWin: true,
        details: [
          {
            id: 5,
            resultId: 2,
            guessTime: new Date(),
            guessNumber: 1,
            guess: "bread",
            isMatch: false,
          },
          {
            id: 6,
            resultId: 2,
            guessTime: new Date(),
            guessNumber: 2,
            guess: "reach",
            isMatch: false,
          },
          {
            id: 7,
            resultId: 2,
            guessTime: new Date(),
            guessNumber: 3,
            guess: "react",
            isMatch: true,
          },
        ],
      },
    ];

    if (results) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ message: `User with ID ${id} not found.` });
    }
  }
}
