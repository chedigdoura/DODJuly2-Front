import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { toast } from "react-toastify";

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async ({ updatedProductData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createProduct(updatedProductData);
      toast.success("Product Added successfully");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getProducts();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getProduct(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProductsBySupplier = createAsyncThunk(
  "product/getProductsBySupplier",
  async (supplierId, { rejectWithValue }) => {
    try {
      const response = await api.getProductsBySupplier(supplierId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteProduct(id);
      toast.success("Product deleted successfully");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, updatedProductData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateProduct(updatedProductData, id);
      toast.success("Product updated successfully");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchProducts = createAsyncThunk(
  "product/searchProducts",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getProductsBySearch(searchQuery);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: {},
    products: [],
    supplierProducts: [],
    error: "",
    loading: false,
  },
  extraReducers: {
    [createProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [createProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = [action.payload];
    },
    [createProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    [getProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [getProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    [getProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getProductsBySupplier.pending]: (state, action) => {
      state.loading = true;
    },
    [getProductsBySupplier.fulfilled]: (state, action) => {
      state.loading = false;
      state.supplierProducts = action.payload;
    },
    [getProductsBySupplier.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("action", action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.supplierProducts = state.supplierProducts.filter(
          (item) => item._id !== id
        );
        state.products = state.products.filter((item) => item._id !== id);
      }
    },
    [deleteProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.loading = false;
      const id = action.payload.id;
      if (id) {
        state.supplierProducts = state.supplierProducts.map((item) =>
          item._id === id ? action.payload : item
        );
        state.products = state.products.map((item) =>
          item._id === id ? action.payload : item
        );
      }
    },
    [updateProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [searchProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [searchProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    [searchProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});
export default productSlice.reducer;
