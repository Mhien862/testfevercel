/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axios.service";
axiosInstance.defaults.headers.common["Authorization"] =
  localStorage.getItem("accessToken") ?? "";
const initialState = {
  service: null,
};

export const fetchServices = createAsyncThunk(
  "service/fetchServices",
  async (payload) => {
    try {
      const response = await axiosInstance.get("services", {
        params: payload,
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);

// export const fetchServicesById = createAsyncThunk('owner/fetchServicesById', async (payload) => {
//   try {
//     const response = await axiosInstance.get(`/services/${payload}`)
//     return response.data.data;
//   } catch (error) {
//     throw error;
//   }
// });

// export const fetchServicesById = createAsyncThunk('service/fetchServicesById', async (payload) => {
//   try {
//     const response = await axiosInstance.get(`/services/${payload}`);
//     return response.data.data;
//   } catch (error) {
//     throw error;
//   }
// });

export const createNewUser = createAsyncThunk(
  "http://localhost:1000/register",
  async (data) => {
    try {
      const response = await axiosInstance.post(
        "http://localhost:1000/register",
        data
      );
      console.log(data);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// const loginAPI = async (email, password) => {
//   const res = await axiosInstance.post("http://localhost:1000/login ", {
//     email,
//     password,
//   });

//   return res.data.data;
// };

const ownerSlice = createSlice({
  name: "service",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchServices.fulfilled, (state, action) => {
      state.manageService = action.payload;
    });
  },
});
const serviceReducer = ownerSlice.reducer;
export default serviceReducer;
