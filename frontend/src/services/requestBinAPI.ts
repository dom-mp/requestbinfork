import axios from "axios";
import type { Request } from "../types";

// TODO: this should be an env var
// const API_BASE = "/mockApi";
const API_BASE = "/api";

const getBaskets = async (): Promise<Array<string>> => {
  const response = await axios.get(`${API_BASE}/baskets`);
  return response.data.basketNames;
};

const getValidBaskets = async (
  basketNames: Array<string>
): Promise<Array<string>> => {
  const response = await axios.get(`${API_BASE}/baskets/validate`, {
    params: { basketNames: basketNames.join(",") },
  });
  return response.data.basketNames;
};

const getToken = async (basketName: string): Promise<string> => {
  const response = await axios.get(`${API_BASE}/baskets/generate_token/`, {
    params: { name: basketName },
  });
  return response.data.token;
};
const generateName = async (): Promise<string> => {
  const response = await axios.get(`${API_BASE}/baskets/generate_name`);
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
    `${API_BASE}/baskets/${basketName}/requests`
  );

  const requests = response.data.requests;

  // TODO: this is a quick-fix; replace with zod
  if (!Array.isArray(requests)) throw new Error("Received unexpected type.");

  return requests;
};

const clearBasket = async (basketName: string): Promise<void> => {
  await axios.delete(`${API_BASE}/baskets/${basketName}/requests`);
};

export default {
  getBaskets,
  getValidBaskets,
  getToken,
  generateName,
  createBasket,
  deleteBasket,
  getRequests,
  clearBasket,
};
