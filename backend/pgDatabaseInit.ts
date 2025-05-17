import { Client } from "pg";
import * as fs from "node:fs";
import path from "node:path";

const isDatabaseCreated = async (client: Client): Promise<boolean> => {
  const query = "SELECT * FROM pg_database WHERE datname = $1";
  let result = await client.query(query, ["requestbin"]);
  return result.rowCount !== 0;
};

const createDataBase = async (client: Client) => {
  const query = "CREATE DATABASE requestbin";
  console.log("Creating PostgreSQL database");
  await client.query(query);
  console.log("Database created");
};

const initializeDB = async () => {
  const client: Client = new Client({
    user: process.env.PGUSER, // default process.env.USER
    password: process.env.PGPASSWORD, //default process.env.PGPASSWORD
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
  });

  await client.connect();

  if (!(await isDatabaseCreated(client))) {
    await createDataBase(client);
  }

  await client.end();
};

const createDataBaseTables = async () => {
  const client: Client = new Client({
    user: process.env.PGUSER, // default process.env.USER
    password: process.env.PGPASSWORD, //default process.env.PGPASSWORD
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    database: "requestbin",
  });

  console.log("Creating database tables");
  await client.connect();
  const SQLFilePath = path.resolve(__dirname, "schema.sql");

  fs.readFile(SQLFilePath, "utf8", async (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    client.query(data).then(() => client.end());
  });

  console.log("Database tables created");
};

const setupSchema = async () => {
  await initializeDB();
  await createDataBaseTables();
};

setupSchema();
