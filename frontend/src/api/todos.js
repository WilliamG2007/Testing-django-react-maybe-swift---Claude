import axios from "axios";

const BASE = "/api/todos";

export const getTodos = () => axios.get(`${BASE}/`);
export const createTodo = (data) => axios.post(`${BASE}/`, data);
export const updateTodo = (id, data) => axios.patch(`${BASE}/${id}/`, data);
export const deleteTodo = (id) => axios.delete(`${BASE}/${id}/`);
