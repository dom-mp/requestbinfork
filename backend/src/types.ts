export interface Request {
  id: number;
  basketId: number;
  method: string;
  sentAt: string;
  headers: string;
  requestBodyContentType: string;
  requestBody: string;
}
