import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = parse(req.headers.cookie || "");
  const isAdmin = cookies.adminToken === "validAdminSession";

  res.status(200).json({ isAdmin });
}
