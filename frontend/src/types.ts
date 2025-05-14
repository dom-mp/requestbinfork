export interface Request {
  basketName: string;
  method: string;
  sentAt: string;
  headers: string;
  requestBody?: string;
}
