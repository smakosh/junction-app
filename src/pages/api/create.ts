import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const prisma = new PrismaClient();
    const { title, content } = req.body;

    const result = await prisma.curriculum.create({
      data: {
        title: title,
        content: content,
        teacher: { connect: { id: 1 } },
        published: true
      },
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err)
  }
};
