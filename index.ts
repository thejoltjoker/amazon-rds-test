import express from "express";
import "dotenv/config";
import { connectToDatabase } from "./src/db";

const app = express();
const port = 3000;
app.use(express.json());
app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World!");
});

app.post(
  "/notes",
  async (
    req: express.Request<{}, {}, { title: string; content: string }>,
    res: express.Response
  ) => {
    console.log(req);
    const { title, content } = req.body;
    try {
      const connection = await connectToDatabase();
      const [results] = await connection.query(
        "INSERT INTO notes (title, content) VALUES (?, ?)",
        [title, content]
      );
      res.json(results);
    } catch (error) {
      console.error("Error in /notes route:", error);
      res.status(500).send("Error creating note: " + error);
    }
  }
);

app.get("/notes", async (req: express.Request, res: express.Response) => {
  try {
    const connection = await connectToDatabase();
    const [results] = await connection.query("SELECT * FROM notes");
    res.json(results);
  } catch (error) {
    console.error("Error in /notes route:", error);
    res.status(500).send("Error fetching notes: " + error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

process.on("SIGTERM", async () => {
  const connection = await connectToDatabase();
  connection.end((err: any) => {
    if (err) {
      console.error("Error closing the database connection: ", err);
    } else {
      console.log("Database connection closed.");
    }
    process.exit(0);
  });
});
