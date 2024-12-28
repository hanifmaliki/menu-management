import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// API Methods
export const getMenus = async () => {
  const response = await api.get('/menus');
  return response.data;
};

export const getMenuById = async (id: string) => {
  const response = await api.get(`/menus/${id}`);
  return response.data;
};

export const createMenu = async (menu: { name: string; depth: number; parentId?: string | null }) => {
  const response = await api.post('/menus', menu);
  return response.data;
};

export const updateMenu = async (id: string, menu: { name: string; depth: number }) => {
  const response = await api.put(`/menus/${id}`, menu);
  return response.data;
};

export const deleteMenu = async (id: string) => {
  const response = await api.delete(`/menus/${id}`);
  return response.data;
};