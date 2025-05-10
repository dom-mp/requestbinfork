import pool from './controllers/postgresql';
import type { Token } from "./types";
import { QueryResult } from 'pg'

export function generate_random_string() {
  return Math.random().toString(36).substring(2);
}

// export async function generate_token(): Promise<string> {
  // let token: string = '';

  // do {
  //   const segments: string[] = Array.from({ length: 3 }, () => generate_random_string());
  //   token= segments.join('');

  //   result = await pool.query('SELECT * FROM tokens WHERE token_value = ($1)',
  //     [token]
  //   );

  // } while (result.rowCount > 0)

  // return token;
// }

export async function storeToken(token: string): Promise<Token | null> {
  const query: string = 'INSERT INTO tokens (token_value) VALUES ($1) RETURNING *'

  try {
    const result = await pool.query(query, [token]);
    console.log('Inserted token:', result.rows[0]);
    return result.rows[0];
  } catch (err) {
    console.error('Error inserting token:', token);
    return null;
  }
}