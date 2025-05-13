// import { IncomingHttpHeaders } from "http";
// import pool from "./controllers/postgresql";
// import type { Token, Basket, Request } from "./types";
import { QueryResult } from "pg";
import PostgresController from "./controllers/postgresql";

export function generateRandomString() {
  return Math.random().toString(36).substring(2);
}

export async function generateToken(): Promise<string> {
  let token: string = "";
  const pg = new PostgresController();
  pg.connect();
  let result: QueryResult;

  try {
    do {
      const segments: string[] = Array.from({ length: 3 }, () =>
        generateRandomString()
      );
      token = segments.join("");

      result = await pg.getToken(token);
    } while ((result.rowCount ?? 0) > 0);
    return token;
  } catch (err) {
    console.error("Error generating token:", err);
    throw new Error("Failed to generate token");
  }
}

// export function headersToString(headers: IncomingHttpHeaders): string {
//   let headerString = "";
//   for (const key in headers) {
//     headerString += `${key}: ${headers[key]}\n`;
//   }

//   return headerString;
// }

// export async function getBasketName(name: string): Promise<string | null> {
//   const query: string = "SELECT name FROM baskets WHERE name = ($1)";
//   const result: QueryResult = await pool.query(query, [name]);

//   if (result.rows.length > 0) {
//     return result.rows[0].name;
//   } else {
//     console.error("Basket not found");
//     return null;
//   }
// }

// export async function saveRequest({
//   basketName,
//   sentAt,
//   method,
//   headers,
//   mongoBodyId,
// }: Request) {
//   const query: string = `INSERT INTO requests (basket_name, sent_at, method, headers, body_mongo_id)
//      VALUES ($1, $2, $3, $4, $5) RETURNING *`;
//   try {
//     const result: QueryResult = await pool.query(query, [
//       basketName,
//       sentAt,
//       method,
//       headers,
//       mongoBodyId,
//     ]);
//     console.log("Inserted request:", result.rows[0]);
//     return result.rows[0];
//   } catch (err) {
//     console.error("Error inserting request:", {
//       basketName,
//       sentAt,
//       method,
//       headers,
//       mongoBodyId,
//     }, err);
//     throw new Error("Failed to store request");
//   }
// }
