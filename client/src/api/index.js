import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

api.interceptors.request.use((config) => {
  config.headers.post["Authorization"] = `Bearer ${sessionStorage.getItem(
    "token"
  )}`;
  config.headers.get["Authorization"] = `Bearer ${sessionStorage.getItem(
    "token"
  )}`;
  config.headers.put["Authorization"] = `Bearer ${sessionStorage.getItem(
    "token"
  )}`;
  config.headers.delete["Authorization"] = `Bearer ${sessionStorage.getItem(
    "token"
  )}`;
  return config;
});

export const getBooks = () => {
  return api.get("/books");
};

export const getBook = (id) => {
  return api.get(`/books/${id}`);
};

export const getAuthors = () => {
  return api.get("/authors");
};

export const getAuthor = (id) => {
  return api.get(`/authors/${id}`);
};

export const getCategories = () => {
  return api.get("/categories");
};

export const getCategory = (id) => {
  return api.get(`/categories/${id}`);
};

export const loginResident = (payload) => {
  return api.post("/residents/auth/login", payload);
};

export const loginEmployee = (payload) => {
  return api.post("/employees/auth/login", payload);
};

export const loginAdmin = (payload) => {
  return api.post("/admins/auth/login", payload);
};

export const createResident = (payload) => {
  return api.post("/residents", payload);
};

export const createEmployee = (payload) => {
  return api.post("/employees", payload);
};

export const createAdmin = (payload) => {
  return api.post("/admins", payload);
};

export const getLoans = id => {
  return api.get(`/loans/resident/${id}`);
}

const apis = {
  getBooks,
  getBook,
  getAuthors,
  getAuthor,
  getCategories,
  getCategory,
  loginResident,
  loginAdmin,
  loginEmployee,
  createAdmin,
  createEmployee,
  createResident,
  getLoans,
};

export default apis;
