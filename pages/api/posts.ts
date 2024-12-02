import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const posts = await prisma.post.findMany();
        res.status(200).json(posts);
      } catch (error) {
        console.log(error);

        res.status(500).json({ error: "Failed to fetch posts" });
      }
      break;

    case "POST":
      try {
        const { title, content } = req.body;
        const newPost = await prisma.post.create({ data: { title, content } });
        res.status(201).json(newPost);
      } catch (error) {
        console.log(error);

        res.status(500).json({ error: "Failed to create post" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
