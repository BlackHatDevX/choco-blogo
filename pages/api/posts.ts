import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  try {
    switch (method) {
      case "GET":
        // Fetch all posts
        const posts = await prisma.post.findMany();
        res.status(200).json(posts);
        break;

      case "POST":
        // Create a new post
        const { title, content } = req.body;

        if (!title || !content) {
          res.status(400).json({ error: "Title and content are required." });
          return;
        }

        const newPost = await prisma.post.create({
          data: { title, content },
        });

        res.status(201).json(newPost);
        break;

      default:
        // Handle unsupported methods
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
  } catch (error) {
    console.error("API Error:", error);
    if (error === "P1001") {
      res.status(500).json({ error: "Unable to connect to the database." });
    } else {
      res.status(500).json({ error: "Internal Server Error." });
    }
  } finally {
    await prisma.$disconnect();
  }
}
