import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import createAPI from "./api";

const API = createAPI((process.env.NEXT_PUBLIC_CART_API_ENDPOINT?? "https://argentinacouponapi.azurewebsites.net"));

export const getSessionCart = createAsyncThunk(
  "cart/getSessionCart",
  async ({ bookingid, router }, { rejectWithValue }) => {
   
    try {
      const response = await API.get("api/SessionCart");
      //router.push('/payment-page')
   //   router.push('/booking-confirm-page')
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getSessionCartSC = createAsyncThunk(
  "cart/getSessionCartSC",
  async ({ bookingid, router }, { rejectWithValue }) => {
   
    try {
      const response = await API.get("api/SessionCartControllerSC");
      //router.push('/payment-page')
   //   router.push('/booking-confirm-page')
      await dispatch(getSessionCartTR());
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getSessionCartTR = createAsyncThunk(
  "cart/getSessionCartTR",
  async ({ bookingid, router }, { rejectWithValue }) => {
   
    try {
      const response = await API.get("api/SessionCartControllerTR");
      //router.push('/payment-page')
   //   router.push('/booking-confirm-page')
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addSessionCart = createAsyncThunk(
  "cart/addSessionCart",
  async ({ rqAddSessionCart, router }, { rejectWithValue }) => {
   
    try {
      
      console.log(JSON.stringify(rqAddSessionCart));
      const response = await API.post(`api/SessionCart/add`,  rqAddSessionCart );
      router.push('/cart-page')
      // Dispatch getSessionCart action after addSessionCart is fulfilled
      await dispatch(getSessionCart()); // Dispatch getSessionCart action
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const addSessionCartSC = createAsyncThunk(
  "cart/addSessionCart",
  async ({ rqAddSessionCart, router }, { rejectWithValue }) => {
   
    try {
      
      console.log(JSON.stringify(rqAddSessionCart));
      const response = await API.post(`api/SessionCartControllerSC/add`,  rqAddSessionCart );
      router.push('/cart-page')
      // Dispatch getSessionCart action after addSessionCart is fulfilled
      await dispatch(getSessionCart()); // Dispatch getSessionCart action
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const addSessionCartTR = createAsyncThunk(
  "cart/addSessionCart",
  async ({ rqAddSessionCart, router }, { rejectWithValue }) => {
   
    try {
      
      console.log(JSON.stringify(rqAddSessionCart));
      const response = await API.post(`api/SessionCartControllerTR/add`,  rqAddSessionCart );
      router.push('/cart-page')
      // Dispatch getSessionCart action after addSessionCart is fulfilled
      await dispatch(getSessionCart()); // Dispatch getSessionCart action
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteSessionCartItem = createAsyncThunk(
  "cart/deleteSessionCartItem",
  async ({ id, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.delete(`api/SessionCart/remove?productId=${id}`);
      // toast.success("Module Updated Successfully");
      // navigate("/dashboard");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const clearSessionCart = createAsyncThunk(
  "cart/clearSessionCart",
  async ({ id, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.delete(`api/SessionCart/clear`);
      // toast.success("Module Updated Successfully");
      // navigate("/dashboard");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);



const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false, 
    error: null, 
    cartItems:[]
  },
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
    // updateFilterParam: (state, action) => {
    //   // Merge the payload with the existing FlightAvailRQ
    //   state.filterParam = {
    //     ...state.filterParam,
    //     ...action.payload,
    //   };
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getSessionCart.pending, (state) => {
      
      state.loading = true;
    });
    builder.addCase(getSessionCart.fulfilled, (state, action) => {
      
      state.loading = false;
      action.payload[0].items.length > 0 ?
      state.cartItems = action.payload : 
      action.meta.arg.router.push("/");
    });
    builder.addCase(getSessionCart.rejected, (state, action) => {
      
      state.cartItems = [];
      state.loading = false;
      state.error = action.payload;
    });
    
    builder.addCase(getSessionCartSC.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSessionCartSC.fulfilled, (state, action) => {
      state.loading = false;
     
      state.cartItems = action.payload;
    });
    builder.addCase(getSessionCartSC.rejected, (state, action) => {
      state.cartItems = [];
      state.loading = false;
      state.error = action.payload;
    });
    
    builder.addCase(getSessionCartTR.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSessionCartTR.fulfilled, (state, action) => {
      state.loading = false;
     
      state.cartItems = action.payload;
    });
    builder.addCase(getSessionCartTR.rejected, (state, action) => {
      state.cartItems = [];
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(addSessionCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addSessionCart.fulfilled, (state, action) => {   
      state.loading = false;
     
      state.cartItems = action.payload;
    });
    builder.addCase(addSessionCart.rejected, (state, action) => { 
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteSessionCartItem.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteSessionCartItem.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems = action.payload;
    });
    builder.addCase(deleteSessionCartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(clearSessionCart.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(clearSessionCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems = action.payload;
    });
    builder.addCase(clearSessionCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearError } = cartSlice.actions;

export default cartSlice.reducer;
