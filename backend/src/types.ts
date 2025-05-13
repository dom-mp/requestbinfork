
import { Document } from "mongoose";

export interface MockRequest {
  basketName: string;
  method: string;
  sentAt: string;
  headers: string;
  requestBodyContentType: string;
  requestBody: string;
}

export interface Token {
  id: number;
  tokenValue: string;
}

export interface Basket {
  id: number;
  name: string;
  token_id: number;
}

export interface RequestBody extends Document {
  id: string;
  request: any;
}

export interface Request {
  basketName: string;
  sentAt: string;
  method: string;
  headers: string;
  mongoBodyId: string | null;
}
