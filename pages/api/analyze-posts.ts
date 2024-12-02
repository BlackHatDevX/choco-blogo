import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const analyzeText = (text: string) => {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const wordCounts = words.reduce(
    (acc: Record<string, number>, word: string) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    },
    {}
  );
  const totalWords = words.length;
  const uniqueWords = Object.keys(wordCounts).length;
  const repetitions = totalWords - uniqueWords;

  return { wordCounts, repetitions, totalWords };
};

const calculateScore = (text: string) => {
  const { repetitions } = analyzeText(text);
  const misspelled = 0; // Placeholder for a real spelling check integration
  // const totalWords = text.split(/\s+/).length;

  // Score logic: customizable
  return Math.max(100 - misspelled - repetitions, 0);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const posts = await prisma.post.findMany();
        const analysis = posts.map((post: { content: string }) => {
          const { wordCounts, repetitions, totalWords } = analyzeText(
            post.content
          );
          const score = calculateScore(post.content);
          return { ...post, wordCounts, repetitions, totalWords, score };
        });
        res.status(200).json(analysis);
      } catch (error) {
        console.log(error);

        res.status(500).json({ error: "Failed to fetch and analyze posts" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
