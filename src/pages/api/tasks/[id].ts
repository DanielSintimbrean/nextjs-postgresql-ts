import { NextApiRequest, NextApiResponse } from "next";
import { connection } from "src/utils/database";

export default async function task_id(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query, body } = req;
  const { title, description } = body;

  switch (method) {
    case "GET":
      try {
        const queryStr = "SELECT * FROM tasks WHERE id = $1";
        const values = [query.id];

        const result = await connection.query(queryStr, values);

        if (result.rows.length === 0) {
          return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json(result.rows[0]);
      } catch (error: any) {
        return res.status(500).json(error.message);
      }
    case "PUT":
      try {
        const queryStr =
          "UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *";
        const values = [title, description, query.id];

        const result = await connection.query(queryStr, values);

        if (result.rowCount === 0) {
          return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json(result.rows[0]);
      } catch (error: any) {
        return res.status(500).json(error.message);
      }
    case "DELETE":
      try {
        const queryStr = "DELETE FROM tasks WHERE id = $1 RETURNING *";
        const values = [query.id];

        const result = await connection.query(queryStr, values);

        if (result.rowCount === 0) {
          return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json(result.rows[0]);
      } catch (error: any) {
        return res.status(500).json(error.message);
      }
    default:
      return res.status(400).json("invalid method");
  }
}
