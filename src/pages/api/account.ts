import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const prisma = new PrismaClient();
    const { id, name, type, email } = req.body;

    let result;

    if(type) {
      result = await prisma.teacher.create({
        data: {
          userId: id,
          name,
          email
        },
      });
    } else {
      result = await prisma.student.create({
        data: {
          userId: id,
          name,
          email,
        },
      });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err)
  }
};
