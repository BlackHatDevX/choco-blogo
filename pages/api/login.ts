import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

const ADMIN_EMAIL = "blogo@admin.com";
const ADMIN_PASSWORD = "blogoAdmin";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const cookie = serialize("adminToken", "validAdminSession", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      });

      res.setHeader("Set-Cookie", cookie);
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
