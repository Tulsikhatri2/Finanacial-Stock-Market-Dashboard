import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoriesServices from "./categoriesService";

const initialState = {
  category: {},
  allCategories: [],
  categoryInfo: {},
  edit: { category: {}, isEdit: false },
  isLoading: false,
  isSuccess: false,
  isError: false,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    editCategory: (state, action) => {
      return {
        ...state,
        edit: { category: action.payload, isEdit: true },
      };
    },
  },
  extraReducers: (builder) => {
    builder

    // All Categories
      .addCase(getAllCategories.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allCategories = action.payload;
        state.isError = false;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })

    //  Get Single Category Details
    .addCase(categoryDetails.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(categoryDetails.fulfilled, (state, action) => {
        console.log(action.payload)
        state.isLoading = false;
        state.isSuccess = true;
        state.categoryInfo = action.payload;
        state.isError = false;
      })
      .addCase(categoryDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Update Category
      .addCase(updateCategory.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allCategories = state.allCategories.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
        state.edit = { category: {}, isEdit: false };
        state.isError = false;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

// Get All Categories
export const getAllCategories = createAsyncThunk(
  "ALL/CATEGORIES",
  async (thunkAPI) => {
    try {
      return await categoriesServices.allCategories();
    } catch (error) {
      console.log(error.message);
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Single Category Details
export const categoryDetails = createAsyncThunk(
  "GET/CATEGORYDETAILS",
  async (_id, thunkAPI) => {
    try {
      return await categoriesServices.getCategoryDetails(_id);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create Category
export const createCategory = createAsyncThunk(
  "CREATE/CATEGORY",
  async (categoryData, thunkAPI) => {
    console.log(categoryData, "from Slice");
    try {
      return await categoriesServices.addCategory(categoryData);
    } catch (error) {
      console.log(error.message);
      // const message = error.response.data.message;
      // return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "UPDATE/CATEGORY",
  async (categoryData) => {
    console.log(categoryData, "from Slice Category");
    try {
      return await categoriesServices.updatedCategory(categoryData);
    } catch (error) {
      // console.log(error.message);
    }
  }
);

export const { editCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
