import { Pool, PoolClient, QueryResult } from "pg";
import { Basket, Request } from "../types";

class PostgresController {
  private dbName: string;
  pool: Pool;

  constructor(dbName: string = "requestbin") {
    this.dbName = dbName;
    this.pool = this.createPool(this.dbName);
  }

  private createPool(dbName: string) {
    return new Pool({
      host: "localhost",
      database: dbName,
      port: 5432,
    });
  }

  public async connect(): Promise<PoolClient> {
    try {
      const client = await this.pool.connect();
      console.log("Connected to PostgreSQL database.");
      return client;
    } catch (err) {
      console.error("Error connecting to PostgreSQL:", err);
      throw err;
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await this.pool.end();
      console.log("Disconnected from PostgreSQL database.");
    } catch (err) {
      console.error("Error disconnecting from PostgreSQL:", err);
      throw err;
    }
  }

  public async getBaskets(): Promise<Basket[]> {
    const query: string = "SELECT * FROM baskets";

    try {
      return (await this.pool.query(query)).rows;
    } catch (err) {
      console.error("Error while getting basket names: ", err);
      throw new Error("Failed to get basket names");
    }
  }

  public async getBasketName(name: string): Promise<string | null> {
    const query: string = "SELECT name FROM baskets WHERE name = ($1)";
    const result: QueryResult = await this.pool.query(query, [name]);

    if (result.rows.length > 0) {
      return result.rows[0].name;
    } else {
      console.error("Basket not found");
      return null;
    }
  }

  public async getToken(tokenValue: string) {
    const query: string = "SELECT token FROM baskets WHERE token = ($1)";
    return await this.pool.query(query, [tokenValue]);
  }

  public async doesBasketExist(name: string): Promise<boolean> {
    const query: string = "SELECT * FROM baskets WHERE name = ($1)";
    let result: QueryResult = await this.pool.query(query, [name]);
    return (result.rowCount ?? 0) > 0;
  }

  public async storeToken(token: string, basketName: string): Promise<Basket> {
    const query: string =
      "UPDATE baskets SET token = ($1) WHERE name = $2 RETURNING *";

    try {
      const result: QueryResult = await this.pool.query(query, [
        token,
        basketName,
      ]);

      console.log("Inserted token:", result.rows[0]);
      return result.rows[0];
    } catch (err) {
      console.error("Error inserting token:", token);
      throw new Error("Failed to store token");
    }
  }

  public async addNewBasket(basketName: string) {
    const query = "INSERT INTO baskets(name) VALUES ($1)";

    try {
      await this.pool.query(query, [basketName]);
      console.log("Basket created");
    } catch (err) {
      console.error("Error creating basket");
      throw new Error("Failed to create basket");
    }
  }

  public async saveRequest({
    basketName,
    sentAt,
    method,
    headers,
    bodyMongoId,
  }: Request) {
    const query: string = `INSERT INTO requests (basket_name, sent_at, method, headers, body_mongo_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    try {
      const result: QueryResult = await this.pool.query(query, [
        basketName,
        sentAt,
        method,
        headers,
        bodyMongoId,
      ]);
      console.log("Inserted request:", result.rows[0]);
      return result.rows[0];
    } catch (err) {
      console.error(
        "Error inserting request:",
        {
          basketName,
          sentAt,
          method,
          headers,
          bodyMongoId,
        },
        err
      );
      throw new Error("Failed to store request");
    }
  }

  public async fetchBasketContents(basketName: string): Promise<Request[]> {
    const query = "SELECT * FROM requests WHERE basket_name = $1";

    const result = await this.pool.query(query, [basketName]);

    return result.rows.map((basketItem) => {
      return {
        basketName: basketItem["basket_name"],
        sentAt: basketItem["sent_at"],
        method: basketItem["method"],
        headers: basketItem["headers"].sp,
        bodyMongoId: basketItem["body_mongo_id"],
      };
    });
  }
}

export default PostgresController;
