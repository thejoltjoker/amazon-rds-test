import "dotenv/config";
import mysql, { ConnectionOptions } from "mysql2/promise";

const access: ConnectionOptions = {
  host: process.env.MYSQL_HOST,
  port: 3306,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

export let connection: mysql.Connection | undefined = undefined;

export const getDbConnection = async () => {
  if (!connection) {
    connection = await mysql.createConnection(access);
  }
  return connection;
};
