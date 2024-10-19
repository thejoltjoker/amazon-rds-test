import mysql from "mysql2/promise";
import "dotenv/config";

export let connection: mysql.Connection | null = null;
export const connectToDatabase = async (): Promise<mysql.Connection> => {
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
