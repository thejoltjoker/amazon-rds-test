import "dotenv/config";
import express, { Request, Response } from "express";
import { ResultSetHeader } from "mysql2";
import { getDbConnection } from "./db";
import { Note, NoteRow } from "./types/Note";

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());

app.get(
  "/notes",
  async (req: Request, res: Response<NoteRow[] | { error: string }>) => {
    console.log("GET:/notes");
    try {
      const db = await getDbConnection();
      const [results] = await db.query<NoteRow[]>("SELECT * FROM notes");
      console.log(results);
      res.status(200).json(results);
    } catch (error) {
      console.error("Error in /notes route:", error);
      res.status(500).json({ error: "Error fetching notes: " + error });
    }
  }
);

app.post(
  "/notes",
  async (
    req: Request<{}, ResultSetHeader, Note>,
    res: Response<ResultSetHeader | { error: string }>
  ) => {
    console.log("POST:/notes");
    const { title, content } = req.body;
    try {
      const db = await getDbConnection();
      const [result] = await db.query<ResultSetHeader>(
        "INSERT INTO notes (title, content) VALUES (?, ?)",
        [title, content]
      );
      res.status(201).json(result);
    } catch (error) {
      console.error("Error in /notes route:", error);
      res.status(500).json({ error: "Error creating note: " + error });
    }
  }
);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
