import { NextApiRequest, NextApiResponse } from "next";

export default function task_id(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET":
      return res.status(200).json("getting unique task");
    case "PUT":
      return res.status(200).json("updateing a unique tasks");
    case "DELETE":
      return res.status(200).json("deleting a unique tasks");
    default:
      return res.status(400).json("invalid method");
  }
}
