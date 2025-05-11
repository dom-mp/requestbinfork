import { IncomingHttpHeaders } from "http";
import pool from "./controllers/postgresql";
import RequestBody from "./controllers/mongo";
import type { Token, Basket, Request } from "./types";
import { QueryResult } from "pg";
import mongoose from "mongoose";

export function generate_random_string() {
  return Math.random().toString(36).substring(2);
}

export async function generate_token(): Promise<string> {
  let token: string = "";
  const query: string = "SELECT * FROM tokens WHERE token_value = ($1)";
  let result: QueryResult<Token>;
  try {
    do {
      const segments: string[] = Array.from({ length: 3 }, () =>
        generate_random_string()
      );
      token = segments.join("");

      result = await pool.query(query, [token]);
    } while ((result.rowCount ?? 0) > 0);
    return token;
  } catch (err) {
    console.error("Error generating token:", err);
    throw new Error("Failed to generate token");
  }
}

export async function storeToken(token: string): Promise<Token> {
  const query: string =
    "INSERT INTO tokens (token_value) VALUES ($1) RETURNING *";

  try {
    const result: QueryResult<Token> = await pool.query(query, [token]);
    console.log("Inserted token:", result.rows[0]);
    return result.rows[0];
  } catch (err) {
    console.error("Error inserting token:", token);
    throw new Error("Failed to store token");
  }
}

export async function isBasketNameUnique(name: string): Promise<boolean> {
  const query: string = "SELECT * FROM baskets WHERE name = ($1)";
  const result: QueryResult<Basket> = await pool.query(query, [name]);
  return result.rows.length === 0;
}

export function headersToString(headers: IncomingHttpHeaders): string {
  let headerString = "";
  for (const key in headers) {
    headerString += `${key}: ${headers[key]}\n`;
  }

  return headerString;
}

export async function getBasketId(name: string): Promise<number | null> {
  const query: string = "SELECT id FROM baskets WHERE name = ($1)";
  const result: QueryResult<Basket> = await pool.query(query, [name]);

  if (result.rows.length > 0) {
    return result.rows[0].id;
  } else {
    console.error("Basket not found");
    return null;
  }
}

export async function saveRequestBody(requestBody: any): Promise<string> {
  try {
    const newRequestBody = new RequestBody({ request: requestBody });
    const saved = await newRequestBody.save();
    console.log("MongoDB: Saved request", saved);
    return saved.toJSON().id;
  } catch (error) {
    console.error("Error saving request:", error);
    throw new Error("Failed to save request body");
  }
}

export async function getRequestBody(bodyMongoId: string) {
  try {
    const objectId = new mongoose.Types.ObjectId(bodyMongoId);
    const requestSaved = await RequestBody.findOne({ _id: objectId });
    if (!requestSaved) {
      throw new Error("Request not found");
    }
    console.log("Request found", requestSaved.request);
    return requestSaved.request;
  } catch (err) {
    console.error("Error fetching request body:", err);
    throw err;
  }
}

export async function saveRequest({
  basketId,
  sentAt,
  method,
  headers,
  mongoBodyId,
}: Request) {
  const query: string = `INSERT INTO notifications (basket_id, sent_at, method, headers, body_mongo_id)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  try {
    const result: QueryResult<Request> = await pool.query(query, [
      basketId,
      sentAt,
      method,
      headers,
      mongoBodyId,
    ]);
    console.log("Inserted request:", result.rows[0]);
    return result.rows[0];
  } catch (err) {
    console.error("Error inserting request:", {
      basketId,
      sentAt,
      method,
      headers,
      mongoBodyId,
    });
    throw new Error("Failed to store request");
  }
}
