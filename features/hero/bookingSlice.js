import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import createAPI from "./api";

const API = createAPI("https://localhost:7007" ?? "https://argentinabookingapi.azurewebsites.net");//("https://localhost:7500");
// Async Thunk for Fetching Hotel Location List

export const getBooking = createAsyncThunk(
  "api/booking",
  async ({ getBookingRQ, router, toast }, { rejectWithValue }) => {
    try {
      const response = await API.get("api/booking?id="+getBookingRQ.id);
      //router.push('/payment-page')
   //   router.push('/booking-confirm-page')
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    business:null,
    bookingid:null,
    bookingRS:null
  },
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(clearError, (state) => {
      state.error = "";
    });
    builder.addCase(getBooking.pending, (state) => {
      
      state.loading = true;
    });
    builder.addCase(getBooking.fulfilled, (state, action) => {
      
      state.loading = false;
      state.bookingRS = JSON.parse(action.payload.result);
    });
    builder.addCase(getBooking.rejected, (state, action) => {
      
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export const { clearError } = bookingSlice.actions;

export default bookingSlice.reducer;
