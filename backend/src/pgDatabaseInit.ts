// const dbName = process.env.PGDATABASE ?? "requestbin";
// const query = "SELECT * FROM pg_database WHERE datname = '$1'";
// const result = await client.query(query, [dbName]);
// return result.rowCount !== 0;

import { Client } from "pg";
import * as fs from "node:fs";
import path from "node:path";

const isDatabaseCreated = async (client: Client): Promise<boolean> => {
  const result = await client.query(
    "SELECT * FROM pg_database WHERE datname = 'requestbin'",
  );
  return result.rowCount !== 0;
};

const createDatabase = async (client: Client) => {
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
    database: "postgres", // connect to the default postgres db
  });

  try {
    await client.connect();

    if (await isDatabaseCreated(client)) {
      throw new Error("Database already exists.");
    } else {
      await createDatabase(client);
    }
  } catch (error: unknown) {
    console.error("Database initialisation aborted:");
    throw error;
  } finally {
    await client.end();
  }
};

const createDatabaseTables = async () => {
  const client: Client = new Client({
    user: process.env.PGUSER, // default process.env.USER
    password: process.env.PGPASSWORD, //default process.env.PGPASSWORD
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    database: "requestbin",
  });

  console.log("Creating database tables");
  await client.connect();

  try {
    const schemaPath = path.resolve(__dirname, "../", "schema.sql");
    const data = await fs.promises.readFile(schemaPath, { encoding: "utf8" });
    const response = await client.query(data);
    console.log("response:", response);
    console.log("Database tables created");
  } catch (error: unknown) {
    console.error("Failed to create database tables:", error);
    throw error;
  } finally {
    await client.end();
  }
};

const setupSchema = async () => {
  await initializeDB();
  await createDatabaseTables();
};

setupSchema();
