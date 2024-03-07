import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import createAPI from "./api";
import { DateObject } from "react-multi-date-picker";

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

export const myBookings = createAsyncThunk(
  "booking/mybookings",
  async ({ filterParam, navigate, toast }, { rejectWithValue }) => {
    debugger;
    try {
      console.log(JSON.stringify(filterParam));
      const response = await API.post(`api/booking/mybookings`,  filterParam );
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
    bookings:[],
    filterParam: {
      ByStatus: "",
      StartDate: new Date(new DateObject().add(-70,"days")).toISOString(),
      EndDate: new Date(new DateObject().add(3,"month")).toISOString(),
      BookingRefNumber: "",
      SortBy: "BookingDate",
      SortDirection: "dsc",
      pageNumber: 1,
      pageSize: 10,
      totalBookings:0,
      totalPages:0,
    },
  },
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
    updateFilterParam: (state, action) => {
      // Merge the payload with the existing FlightAvailRQ
      state.filterParam = {
        ...state.filterParam,
        ...action.payload,
      };
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
    builder.addCase(myBookings.pending, (state) => {
      debugger;
            state.loading = true;
    });
    builder.addCase(myBookings.fulfilled, (state, action) => {      
      debugger;
      state.loading = false;
      state.bookings = action.payload.result?.bookingList;
      state.totalPages = action.payload.result?.totalPages;
      state.totalBookings = action.payload.result?.totalBookings;
    });
    builder.addCase(myBookings.rejected, (state, action) => {     
      debugger; 
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export const { clearError, updateFilterParam } = bookingSlice.actions;

export default bookingSlice.reducer;
