import { apiClient } from "./client";

const BASE = "/api/foods";

export const foodService = {
  getAll: () => apiClient.get(BASE),
  getOne: (id) => apiClient.get(`${BASE}/${id}`),
  create: (food) => apiClient.post(BASE, food),
  update: (id, food) => apiClient.put(`${BASE}/${id}`, food),
  remove: (id) => apiClient.delete(`${BASE}/${id}`),
};
