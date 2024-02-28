import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import createAPI from "./api";

const API = createAPI("https://argentinaorderapi.azurewebsites.net" ?? "https://argentinabookingapi.azurewebsites.net");//("https://localhost:7005");
// Async Thunk for Fetching Hotel Location List

export const getBooking = createAsyncThunk(
  "booking/booking",
  async ({ bookingid, router, toast }, { rejectWithValue }) => {
    try {
      const response = await API.get("api/booking/"+ bookingid);
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
    getbookingRS:null,
    loading: false, 
    error: null, 
  },
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(getBooking.pending, (state) => {
      
      state.loading = true;
    });
    builder.addCase(getBooking.fulfilled, (state, action) => {
      
      let parsedData = {
        ...action.payload.result,
        bookingResponse: JSON.parse(action.payload.result.bookingResponse),
      };
      state.loading = false;
      state.getbookingRS = parsedData;
    });
    builder.addCase(getBooking.rejected, (state, action) => {
      
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export const { clearError } = bookingSlice.actions;

export default bookingSlice.reducer;
