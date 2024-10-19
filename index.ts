import express from "express";
import mysql from "mysql2/promise";
import "dotenv/config";

const app = express();
const port = 3000;

let connection: mysql.Connection | null = null;

const connectToDatabase = async (): Promise<mysql.Connection> => {
  if (connection) {
    return connection;
  }

  console.log("Attempting to connect to database...");
  console.log(`Host: ${process.env.MYSQL_HOST}`);

  try {
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: 3306,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
    console.log("Database connection successful");
    return connection;
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
};

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World!");
});

app.get("/users", async (req: express.Request, res: express.Response) => {
  try {
    const connection = await connectToDatabase();
    const [results] = await connection.query("SELECT * FROM users");
    res.json(results);
  } catch (error) {
    console.error("Error in /users route:", error);
    res.status(500).send("Error fetching users: " + error);
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
