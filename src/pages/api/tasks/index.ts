import { NextApiRequest, NextApiResponse } from "next";
import { connection } from "src/utils/database";

export default async function tasks(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const query = "SELECT * FROM tasks";
        const response = await connection.query(query);

        return res.status(200).json(response.rows);
      } catch (error: any) {
        return res.status(400).json(error.message);
      }

    case "POST":
      const { title, description } = body;

      const query =
        "INSERT INTO tasks(title, description) VALUES ($1, $2) RETURNING *";
      const values = [title, description];

      const response = await connection.query(query, values);

      console.log(response);

      return res.status(200).json(response.rows);
    default:
      return res.status(400).json("invalid method");
  }

  res.json("tasks");
}
