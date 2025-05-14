import axios from "axios";
import type { Request } from "../types";

// TODO: this should be an env var
// const API_BASE = "/mockApi";
const API_BASE = "/api";

const getBaskets = async (): Promise<Array<string>> => {
  const response = await axios.get(`${API_BASE}/baskets`);
  return response.data.baskets;
};

const generateName = async (): Promise<string> => {
  const response = await axios.get(`${API_BASE}/generate_name`);
  return response.data.basketName;
};

const createBasket = async (basketName: string): Promise<string> => {
  const response = await axios.post(`${API_BASE}/baskets/${basketName}`);
  console.log(response);
  return response.data.basketName;
};

const deleteBasket = async (basketName: string): Promise<void> => {
  await axios.delete(`${API_BASE}/baskets/${basketName}`);
};

const getRequests = async (basketName: string): Promise<Array<Request>> => {
  const response = await axios.get(
    `${API_BASE}/baskets/${basketName}/requests`,
  );
  return response.data.requests;
};

const clearBasket = async (basketName: string): Promise<void> => {
  await axios.delete(`${API_BASE}/baskets/${basketName}/requests`);
};

export default {
  getBaskets,
  generateName,
  createBasket,
  deleteBasket,
  getRequests,
  clearBasket,
};
