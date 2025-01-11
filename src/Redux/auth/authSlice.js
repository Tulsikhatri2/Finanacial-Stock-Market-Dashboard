import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authServices from "./authService";

const initialState = {
  user: {},
  registerUser: null,
  allUsersData: [],
  userInfo: {
    name: "default Name",
    email: "default@gmail.com",
    id: "1325476787967534",
    isEmailVerified: "yes",
    createAt: "7/09/23",
    updateAt: "10/06/24",
  },
  edit: { user: {}, isEdit: false },
  verificationMessage: "",
  isError: false,
  isSuccess: false,
  message: "",
  userToken: "",
  updateStatus: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    editUser: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        edit: { user: action.payload, isEdit: true },
      };
    },
  },
  extraReducers: (builder) => {
    builder

      // Login User
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action.payload)
        localStorage.setItem("token", action.payload.token);
        state.userToken = action.payload.token;
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      // Google Login
      .addCase(googleLogin.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        state.userToken = action.payload.token;
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      // Register User
      .addCase(registerUsers.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(registerUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.registerUser = action.payload;
      })
      .addCase(registerUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      // Email Verification
      .addCase(emailVerification.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(emailVerification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.verificationMessage = action.payload;
        state.isError = false;
      })
      .addCase(emailVerification.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = action.payload;
      })

      // All Users Data
      .addCase(getAllUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.allUsersData = action.payload;
        state.updateStatus = "";
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      // Single User Info
      .addCase(userDetails.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(userDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userInfo = action.payload;
        state.isError = false;
      })
      .addCase(userDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Delete User
      .addCase(deleteUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      // Update User
      .addCase(updateUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log(action.payload.status, "update Slice");
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.allUsers = state.allUsers.map((item) =>
          item.id === action.payload.data.data.id
            ? action.payload.data.data
            : item
        );
        state.updateStatus = action.payload.status;
        state.edit = { user: {}, isEdit: false };
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      // Forgot Password
      .addCase(forgotPasword.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(forgotPasword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(forgotPasword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      // Reset Password
      .addCase(resetPassword.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

// Login User
export const loginUser = createAsyncThunk(
  "LOGIN/USER",
  async (formdata, thunkAPI) => {
    try {
      return await authServices.login(formdata);
    } catch (error) {
      const message = error.response.data.message;
      console.log(message, "from slice message");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const googleLogin = createAsyncThunk(
  "GOOGLE/LOGIN",
  async (userToken, thunkAPI) => {
 
    try {
      return await authServices.googleUserLogin(userToken);
    } catch (error) {
      // const message = error.response.data.message;
      console.log(message, "from slice message");
      // return thunkAPI.rejectWithValue(message);
    }
  }
);

// Register User
export const registerUsers = createAsyncThunk(
  "REGISTER/USER",
  async (formdata, thunkAPI) => {
    try {
      return await authServices.register(formdata);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Email Verification
export const emailVerification = createAsyncThunk(
  "EMAIL/VERIFICATION",
  async (data, thunkAPI) => {
    // console.log(data, "Slice Verification");
    try {
      return await authServices.verification(data);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// All Users
export const getAllUser = createAsyncThunk("GET/ALLUSERS", async (thunkAPI) => {
  try {
    return await authServices.allUsers();
  } catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// User Details
export const userDetails = createAsyncThunk(
  "GET/USERDETAILS",
  async (userId, thunkAPI) => {
    console.log(userId, "slice");
    try {
      return await authServices.getUserDetails(userId);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete User
export const deleteUser = createAsyncThunk(
  "DELETE/USER",
  async (id, thunkAPI) => {
    try {
      return await authServices.removeUser(id);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update User
export const updateUser = createAsyncThunk(
  "UPDATE/USER",
  async (userdata, thunkAPI) => {
    console.log(userdata, "SLice Update Data");
    try {
      const token = thunkAPI.getState().auth.user.token;
      console.log(token, "Update TOken");
      return await authServices.updatedUser(userdata, token);
    } catch (error) {
      console.log(error.message);
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Forgot Password
export const forgotPasword = createAsyncThunk(
  "FORGOT/PASSWPRD",
  async (email, thunkAPI) => {
    console.log(email);
    try {
      return await authServices.userForgetPassword(email);
    } catch (error) {
      console.log(error.message);
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Reset Password
export const resetPassword = createAsyncThunk(
  "RESET/PASSWORD",
  async (userData, thunkAPI) => {
    try {
      return await authServices.userPasswordReset(userData);
    } catch (error) {
      console.log(error.message);
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const { editUser } = authSlice.actions;

export default authSlice.reducer;
