export interface Request {
  basketName: string,
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
