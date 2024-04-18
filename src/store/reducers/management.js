import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axios.service";

const initialState = {
    management: null,
}

const token =  localStorage.getItem('accessToken') ?? '';

localStorage.setItem('accessToken', token)

export const getManagement = createAsyncThunk(
    'management/getManagement',
    async (payload) => {
        try {
            const result = await axiosInstance.get('garages', {
                params: payload,
            })
            return result.data.data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const fetchGarageById = createAsyncThunk('management/fetchGarageById', async (payload) => {
    try {
      const result = await axiosInstance.get(`garages/${payload}`);
      return result.data.data;
    } catch (error) { 
      console.log(error); 
    }
  });

export const createGarage = createAsyncThunk('management/createGarage', async (garageData) => {
    try {
      const result = await axiosInstance.post('/garages', garageData);
      return result.data.data;
    } catch (error) {
      console.log(error);
    }
  });
        
export const managementSlice = createSlice({
    name: 'management',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(getManagement.fulfilled, (state, actions) => {
            state.management = actions.payload;
        });
        builder.addCase(fetchGarageById.fulfilled, (state, action) => {
            state.garageById = action.payload;
          });
    }
})

// Action creators are generated for each case reducer function
// export const { removeManagement } = managementSlice.actions;

const managementReducer = managementSlice.reducer;

export default managementReducer