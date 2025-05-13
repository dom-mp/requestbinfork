
import { Document } from "mongoose";

export interface MockRequest {
  basketName: string;
  method: string;
  sentAt: string;
  headers: string;
  requestBodyContentType: string;
  requestBody: string;
}

export interface Basket {
  name: string;
  token: string;
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
  bodyMongoId: string | null;
}
