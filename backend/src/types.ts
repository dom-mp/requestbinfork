export interface Request {
  id: number;
  basket_id: number;
  method: string;
  sent_at: string;
  headers: string;
  request_body_content_type: string;
  request_body: string;
}
