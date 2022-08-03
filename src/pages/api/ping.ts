// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connection } from "../../utils/database";

type Data = {
  message: string;
  time: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await connection.query("SELECT NOW()");

  res
    .status(200)
    .json({ message: "pong", time: response.rows[0].now.toString() });
}
