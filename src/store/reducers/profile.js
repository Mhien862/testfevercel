// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axiosInstance from "../../services/axios.service";

// const initialState = {
//   profile: null,
//   profiles: [],
// };

// // export const getProfile = createAsyncThunk("profile/getProfile", async () => {
// //   try {
// //     const result = await axiosInstance.get("auth/profile");
// //     return result.data.data;
// //   } catch (error) {
// //     console.log(error);
// //   }
// // });

// // export const profileSlice = createSlice({
// //   name: "profile",
// //   initialState,
// //   reducers: {},
// //   extraReducers: (builder) => {
// //     builder.addCase(getProfile.fulfilled, (state, actions) => {
// //       state.profile = actions.payload;
// //     });
// //   },
// // });

// // Action creators are generated for each case reducer function
// // export const { editProfile, addProfile } = profileSlice.actions;

// const profileReducer = profileSlice.reducer;

// export default profileReducer;
