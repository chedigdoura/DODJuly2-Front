import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});
export const singnIn = (formData) => API.post("/users/signin", formData);
export const singnUp = (formData) => API.post("/users/signup", formData);
export const createProduct = (productData) => API.post("/product", productData);
export const getProducts = () => API.get("/product");
export const getProduct = (id) => API.get(`/product/${id}`);
export const deleteProduct = (id) => API.delete(`/product/${id}`);
export const updateProduct = (updatedProductData, id) =>
  API.patch(`/product/${id}`, updatedProductData);
export const getProductsBySupplier = (supplierId) =>
  API.get(`/product/supplierProducts/${supplierId}`);
