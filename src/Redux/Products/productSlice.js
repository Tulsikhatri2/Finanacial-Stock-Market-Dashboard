import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productServices from "./productService";

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: {},
    allProductList: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        console.log(action.payload, "pro");
        state.isLoading = false;
        state.isSuccess = true;
        state.allProductList = action.payload;
        state.isError = false;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get Single Product
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
        state.isError = false;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const getAllProducts = createAsyncThunk(
  "GET/ALLPRODUCTS",
  async (thunkAPI) => {
    try {
      return await productServices.allProducts();
    } catch (error) {
      console.log(error);
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getProduct = createAsyncThunk(
  "GET/SINGLE/PRODUCT",
  async (_id, thunkAPI) => {
    try {
      return await productServices.getProductDetails(_id);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "CREATE/PRODUCT",
  async (productData, thunkAPI) => {
    console.log(productData, "slice data");
    for (let [key, value] of productData.entries()) {
      console.log(key, value);
    }
    try {
      const token = thunkAPI.getState().auth.user.token;
      console.log(token)
      return await productServices.productAdd(productData);
    } catch (error) {
      console.log(error);
    }
  }
);

export default productSlice.reducer;
