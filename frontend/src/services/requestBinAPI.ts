import axios from "axios";
import type { Request } from "../types";

// TODO: this should be an env var
// const API_BASE = "/mockApi";
const API_BASE = "/api";

const getBaskets = async (): Promise<Array<string>> => {
  const response = await axios.get(`${API_BASE}/baskets`);
  return response.data.baskets;
};

const getToken = async (): Promise<string> => {
  const response = await axios.get(`${API_BASE}/generate_token`);
  return response.data.token;
};

const generateName = async (): Promise<string> => {
  const response = await axios.get(`${API_BASE}/generate_name`);
  return response.data.basketName;
};

const createBasket = async (basketName: string): Promise<string> => {
  const response = await axios.post(`${API_BASE}/baskets/${basketName}`);
  return response.data.basketName;
};

const deleteBasket = async (basketName: string): Promise<void> => {
  await axios.delete(`${API_BASE}/baskets/${basketName}`);
};

const getRequests = async (basketName: string): Promise<Array<Request>> => {
  const response = await axios.get(
    `${API_BASE}/baskets/${basketName}/requests`,
  );

  const requests = response.data;
  // TODO: this is a quick-fix; replace with zod
  if (!Array.isArray(requests)) throw new Error("Received unexpected type.");

  return requests;
};

const clearBasket = async (basketName: string): Promise<void> => {
  await axios.delete(`${API_BASE}/baskets/${basketName}/requests`);
};

export default {
  getBaskets,
  getToken,
  generateName,
  createBasket,
  deleteBasket,
  getRequests,
  clearBasket,
};
