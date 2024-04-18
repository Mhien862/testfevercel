/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../services/axios.service';
// import { v4 as uuidv4 } from 'uuid';
axiosInstance.defaults.headers.common['Authorization'] = localStorage.getItem('accessToken') ?? '';
const initialState = {
  manageOwner: null,
  userByIdData: null,
 }

const token = localStorage.getItem('accessToken') ?? '';

localStorage.setItem('accessToken', token);

export const fetchOwners = createAsyncThunk('owner/fetchOwners', async () => {
  try {
    const response = await axiosInstance.get('users');
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchOwnersById = createAsyncThunk('/owner/fetchOwnersById', async (payload) => {
  try {
    const response = await axiosInstance.get(`/users/${payload}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
});

export const updateOwner = createAsyncThunk('owner/updateOwner', async ({ _id, data }) => {
  try {
    const response = await axiosInstance.put(`/users/${_id}`, data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
});

export const createNewOwner = createAsyncThunk('/owner/createNewOwner', async (ownerData) => {
  try {
    const response = await axiosInstance.post('users', ownerData);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
});

const ownerSlice = createSlice({
  name: 'owner',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOwners.fulfilled, (state, action) => {
      state.manageOwner = action.payload;
    });
    builder.addCase(fetchOwnersById.fulfilled, (state, action) => {
      state.ownerByIdData = action.payload;
    });
    builder.addCase(updateOwner.fulfilled, (state, action) => {
      
    });
  },
});

const ownerReducer = ownerSlice.reducer;
export default ownerReducer;
