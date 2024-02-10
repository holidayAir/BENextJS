import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import createAPI from "./api";
import { DateObject } from "react-multi-date-picker";

const API = createAPI(process.env.NEXT_PUBLIC_FLIGHT_API_ENDPOINT);
// Async Thunk for Fetching Hotel Location List
export const fetchLocationList = createAsyncThunk(
  "flight/fetchLocationList",
  async ({ query, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await API.get(`api/flight/fetchLocationList?searchQuery=${query}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchLocationToList = createAsyncThunk(
  "flight/fetchLocationToList",
  async ({ query, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await API.get(`api/flight/fetchLocationList?searchQuery=${query}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const flightAvailResult = createAsyncThunk(
  "flight/flightAvailResult",
  async ({ flightAvailRQ, navigate, toast }, { rejectWithValue }) => {
    try {
      console.log(JSON.stringify(flightAvailRQ));
      const response = await API.post(`api/flight/flightAvailResult`,  flightAvailRQ );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const flightExtraCharges = createAsyncThunk(
  "flight/flightExtraCharges",
  async ({ flightExtraChargesRQ, router, toast }, { rejectWithValue }) => {
    try {
      console.log(JSON.stringify(flightExtraChargesRQ));
      const response = await API.post(`api/flight/GetAirExtraCharges`,  flightExtraChargesRQ );
      //navigate("/booking-page");
      router.push('/cart-page')
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async Thunk for Fetching Hotel List with Filter and Sorting
export const fetchHotelList = createAsyncThunk(
  "hotel/fetchHotelList",
  async ({ filters, sortOptions }, { rejectWithValue }) => {
    try {
      const response = await API.post("api/hotel/list", { filters, sortOptions });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async Thunk for Fetching Hotel Details
export const fetchHotelDetails = createAsyncThunk(
  "hotel/fetchHotelDetails",
  async (hotelId, { rejectWithValue }) => {
    try {
      const response = await API.get(`api/hotel/${hotelId}/details`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async Thunk for Adding Hotel to Cart
export const addToCart = createAsyncThunk(
  "hotel/addToCart",
  async ({ hotelId, quantity }, { rejectWithValue }) => {
    try {
      const response = await API.post("api/cart/add", { hotelId, quantity });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async Thunk for Completing Hotel Reservation
export const completeReservation = createAsyncThunk(
  "hotel/completeReservation",
  async ({ cartItems, paymentInfo }, { rejectWithValue }) => {
    try {
      const response = await API.post("api/reservation/complete", { cartItems, paymentInfo });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const flightSlice = createSlice({
  name: "flight",
  initialState: {
    filterParam: {
      cabin: [],
      priceMinMax: [0, 100000],
      stops: [],
      pageNumber: 0,
      pageSize: 10
    },
    returnFilterParam: {
      cabin: [],
      priceMinMax: [0, 100000],
      stops: [],
      pageNumber: 0,
      pageSize: 10
    },
    locationList: [],
    flightList: [],
    extraCHARGES: {},
    returnFlightList: [],
    hotelDetails: null,
    selectedFlight:{"addOnSegment":"false","airlineCode":"HL","airlineName":"Holiday Air","bookingClassList":[{"cabin":"BUSINESS","resBookDesigCode":"H","resBookDesigQuantity":"9","resBookDesigStatusCode":"O"},{"cabin":"ECONOMY","resBookDesigCode":"O","resBookDesigQuantity":"9","resBookDesigStatusCode":"O"},{"cabin":"ECONOMY","resBookDesigCode":"L","resBookDesigQuantity":"9","resBookDesigStatusCode":"O"},{"cabin":"ECONOMY","resBookDesigCode":"I","resBookDesigQuantity":"9","resBookDesigStatusCode":"O"},{"cabin":"ECONOMY","resBookDesigCode":"D","resBookDesigQuantity":"9","resBookDesigStatusCode":"O"},{"cabin":"ECONOMY","resBookDesigCode":"A","resBookDesigQuantity":"9","resBookDesigStatusCode":"O"}],"flightNumber":"111","arrivalAirport":{"city":{"locationCode":"BUE","locationName":"Buenos Aires-Arpt Intl","locationNameLanguage":"EN"},"country":{"locationCode":"AR","locationName":"Argentina","locationNameLanguage":"EN","currencyCode":"EUR"},"codeContext":"IATA","language":"EN","locationCode":"EZE","locationName":"Buenos Aires - EZE INTL APT","timeZoneInfo":"America/Argentina/Buenos_Aires"},"arrivalDateTime":"2024-04-05T11:30:00+05:30","arrivalDateTimeUTC":"2024-04-05T14:30:00+05:30","departureAirport":{"city":{"locationCode":"MIA","locationName":"Miami","locationNameLanguage":"EN"},"country":{"locationCode":"US","locationName":"United States","locationNameLanguage":"EN","currencyCode":"USD"},"codeContext":"IATA","language":"EN","locationCode":"MIA","locationName":"Miami - MIA INTL APT","timeZoneInfo":"America/New_York"},"departureDateTime":"2024-04-05T01:30:00+05:30","departureDateTimeUTC":"2024-04-05T05:30:00+05:30","flightSegmentID":"9637571","ondControlled":"false","sector":"INTERNATIONAL","accumulatedDuration":"","codeshare":"false","dateChangeNbr":"+1","distance":"0","equipment":{"airEquipType":"A330-30C/272Y","changeofGauge":"false"},"flownMileageQty":"0","groundDuration":"","iatciFlight":"false","journeyDuration":"PT9H","onTimeRate":"0","secureFlightDataRequired":"false","stopQuantity":"0","indicativePrice":420,"ticketType":"PAPER","trafficRestriction":{"code":"","explanation":""},"marriageGroup":"-1","indicativeBaseFare":1950,"passengerFareInfoList":[{"rqCreateBooking":"<bookingClass><cabin>ECONOMY</cabin><resBookDesigCode>Y</resBookDesigCode><resBookDesigQuantity>9</resBookDesigQuantity><resBookDesigStatusCode>O</resBookDesigStatusCode></bookingClass><fareInfoList>\r\n  <cabin>ECONOMY</cabin>\r\n  <cabinClassCode>Y</cabinClassCode>\r\n  <fareBaggageAllowance>\r\n    <allowanceType>PIECE</allowanceType>\r\n    <maxAllowedPieces>0</maxAllowedPieces>\r\n    <maxAllowedWeight>\r\n      <unitOfMeasureCode>KG</unitOfMeasureCode>\r\n      <weight>0</weight>\r\n    </maxAllowedWeight>\r\n  </fareBaggageAllowance>\r\n  <fareGroupName>ECO</fareGroupName>\r\n  <fareReferenceCode>OLUS</fareReferenceCode>\r\n  <fareReferenceID>0ce07b9e86da12d38d0dbc3a7ce27734ffa7c03884488608c099c821e149e6055e21691c51c2a3d9c355f75fdd5846f3686e2fad1630b5f99163029d879e5b09432b217b460ab279ea242c3723de4d764c689f83e0e9d86b079c84706048b48f490015b7ababd5cf791b91b40fd1f60c7458f1b588b255182ce22918dc01f118eb8679507244efce35cdafc2b9136b7a9cde65ffd8b2506ec0536514f98638</fareReferenceID>\r\n  <fareReferenceName>OLUS</fareReferenceName>\r\n  <flightSegmentSequence>1</flightSegmentSequence>\r\n  <portTax>T</portTax>\r\n  <resBookDesigCode>O</resBookDesigCode>\r\n</fareInfoList><flightSegment>\r\n  <airline>\r\n    <code>HL</code>\r\n    <companyFullName>Holiday Air</companyFullName>\r\n  </airline>\r\n  <arrivalAirport>\r\n    <cityInfo>\r\n      <city>\r\n        <locationCode>BUE</locationCode>\r\n        <locationName>Buenos Aires-Arpt Intl</locationName>\r\n        <locationNameLanguage>EN</locationNameLanguage>\r\n      </city>\r\n      <country>\r\n        <locationCode>AR</locationCode>\r\n        <locationName>Argentina</locationName>\r\n        <locationNameLanguage>EN</locationNameLanguage>\r\n        <currency>\r\n          <code>EUR</code>\r\n        </currency>\r\n      </country>\r\n    </cityInfo>\r\n    <codeContext>IATA</codeContext>\r\n    <language>EN</language>\r\n    <locationCode>EZE</locationCode>\r\n    <locationName>Buenos Aires - EZE INTL APT</locationName>\r\n    <timeZoneInfo>America/Argentina/Buenos_Aires</timeZoneInfo>\r\n  </arrivalAirport>\r\n  <arrivalDateTime>2024-04-05T09:00:00+03:00</arrivalDateTime>\r\n  <arrivalDateTimeUTC>2024-04-05T12:00:00+03:00</arrivalDateTimeUTC>\r\n  <departureAirport>\r\n    <cityInfo>\r\n      <city>\r\n        <locationCode>MIA</locationCode>\r\n        <locationName>Miami</locationName>\r\n        <locationNameLanguage>EN</locationNameLanguage>\r\n      </city>\r\n      <country>\r\n        <locationCode>US</locationCode>\r\n        <locationName>United States</locationName>\r\n        <locationNameLanguage>EN</locationNameLanguage>\r\n        <currency>\r\n          <code>USD</code>\r\n        </currency>\r\n      </country>\r\n    </cityInfo>\r\n    <codeContext>IATA</codeContext>\r\n    <language>EN</language>\r\n    <locationCode>MIA</locationCode>\r\n    <locationName>Miami - MIA INTL APT</locationName>\r\n    <timeZoneInfo>America/New_York</timeZoneInfo>\r\n  </departureAirport>\r\n  <departureDateTime>2024-04-04T23:00:00+03:00</departureDateTime>\r\n  <departureDateTimeUTC>2024-04-05T03:00:00+03:00</departureDateTimeUTC>\r\n  <flightNumber>111</flightNumber>\r\n  <flightSegmentID>963757</flightSegmentID>\r\n  <ondControlled>false</ondControlled>\r\n  <sector>INTERNATIONAL</sector>\r\n  <accumulatedDuration></accumulatedDuration>\r\n  <codeshare>false</codeshare>\r\n  <dateChangeNbr>+1</dateChangeNbr>\r\n  <distance>0</distance>\r\n  <equipment>\r\n    <airEquipType>A330-30C/272Y</airEquipType>\r\n    <changeofGauge>false</changeofGauge>\r\n  </equipment>\r\n  <flownMileageQty>0</flownMileageQty>\r\n  <groundDuration></groundDuration>\r\n  <iatciFlight>false</iatciFlight>\r\n  <journeyDuration>PT9H</journeyDuration>\r\n  <onTimeRate>0</onTimeRate>\r\n  <secureFlightDataRequired>false</secureFlightDataRequired>\r\n  <stopQuantity>0</stopQuantity>\r\n  <ticketType>PAPER</ticketType>\r\n  <trafficRestriction>\r\n    <code></code>\r\n    <explanation />\r\n  </trafficRestriction>\r\n</flightSegment>","cabin":"ECONOMY","cabinClassCode":"Y","fareBaggageAllowanceType":"PIECE","fareBaggageMaxAllowedPieces":0,"fareBaggageUnitOfMeasureCode":"KG","fareBaggageWeight":0,"fareGroupName":"ECO","fareReferenceCode":"OLUS","fareReferenceID":"0ce07b9e86da12d38d0dbc3a7ce27734ffa7c03884488608c099c821e149e6055e21691c51c2a3d9c355f75fdd5846f3686e2fad1630b5f99163029d879e5b09432b217b460ab279ea242c3723de4d764c689f83e0e9d86b079c84706048b48f490015b7ababd5cf791b91b40fd1f60c7458f1b588b255182ce22918dc01f118eb8679507244efce35cdafc2b9136b7a9cde65ffd8b2506ec0536514f98638","fareReferenceName":"OLUS","flightSegmentSequence":1,"portTax":"T","resBookDesigCode":"O","resBookDesigQuantity":"O","hasStrecher":false,"passengerType":"ADLT","passengerQuantity":1,"pricingInfo":{"baseFare":{"currencyCode":"USD","mileAmount":0,"amount":600},"fareBaggageAllowance":0,"fees":{"currencyCode":"USD","mileAmount":0,"amount":0},"surcharges":{"currencyCode":"USD","mileAmount":0,"amount":0},"taxes":{"currencyCode":"USD","mileAmount":0,"amount":0},"totalFare":{"currencyCode":"USD","mileAmount":0,"amount":600},"discountApplied":false,"passengerTypeCode":"ADLT"}}],"pricingOverview":{"equivTotalAmountList":{"accountingSign":"ADC","currencyCode":"","mileAmount":0,"value":0},"totalAmount":{"accountingSign":"ADC","currencyCode":"USD","mileAmount":0,"value":1950},"totalBaseFare":{"accountingSign":"ADC","currencyCode":"USD","mileAmount":0,"value":1950},"totalCommission":{"accountingSign":"ADC","currencyCode":"","mileAmount":0,"value":0},"totalCommissionVat":{"accountingSign":"ADC","currencyCode":"","mileAmount":0,"value":0},"totalDiscount":{"accountingSign":"ADC","currencyCode":"","mileAmount":0,"value":0},"totalOtherFee":{"accountingSign":"ADC","currencyCode":"","mileAmount":0,"value":0},"totalPenalty":{"accountingSign":"ADC","currencyCode":"","mileAmount":0,"value":0},"totalServiceCharge":{"accountingSign":"ADC","currencyCode":"","mileAmount":0,"value":0},"totalSurcharge":{"accountingSign":"ADC","currencyCode":"","mileAmount":0,"value":0},"totalTax":{"accountingSign":"ADC","currencyCode":"USD","mileAmount":0,"value":0},"totalTransactionFee":{"accountingSign":"ADC","currencyCode":"","mileAmount":0,"value":0}}},
    selectedReturnFlight:{},
    cart: [],
    reservationStatus: null,
    error: "",
    totalFlights:0,
    totalPages:0,
    totalReturnFlights:0,
    totalRetutrnPages:0,
    loading: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
    updateFlightCart: (state, action) => {
      // Assuming the payload contains information about the flight cart
      const cartPayload = action.payload;
    
      // Update the state.cart with the payload
      state.cart = cartPayload;
    
      // If you need to merge the payload with an existing array in state.cart, use a spread operator
      // For example, if cartPayload is an array of items to add to the cart
      // state.cart = [...state.cart, ...cartPayload];
    },
    updateSelectedFlight: (state, action) => {
      // Assuming the payload contains information about the flight cart
      const cartPayload = action.payload;
    
      // Update the state.cart with the payload
      state.selectedFlight = cartPayload;
    
      // If you need to merge the payload with an existing array in state.cart, use a spread operator
      // For example, if cartPayload is an array of items to add to the cart
      // state.cart = [...state.cart, ...cartPayload];
    },
    updateSelectedReturnFlight: (state, action) => {
      // Assuming the payload contains information about the flight cart
      const cartPayload = action.payload;
    
      // Update the state.cart with the payload
      state.selectedReturnFlight = cartPayload;
    
      // If you need to merge the payload with an existing array in state.cart, use a spread operator
      // For example, if cartPayload is an array of items to add to the cart
      // state.cart = [...state.cart, ...cartPayload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLocationList.pending, (state) => {
      
      state.loading = false;
    });
    builder.addCase(fetchLocationList.fulfilled, (state, action) => {
      
      state.loading = false;
      state.locationList = action.payload.result;
    });
    builder.addCase(fetchLocationList.rejected, (state, action) => {
      
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(fetchLocationToList.pending, (state) => {
      
      state.loading = false;
    });
    builder.addCase(fetchLocationToList.fulfilled, (state, action) => {
      
      state.loading = false;
      state.locationToList = action.payload.result;
    });
    builder.addCase(fetchLocationToList.rejected, (state, action) => {
      
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(flightAvailResult.pending, (state) => {
      
      state.loading = true;
    });
    builder.addCase(flightAvailResult.fulfilled, (state, action) => {
      
      state.loading = false;
      state.flightList = action.payload.result?.flightList;
      state.filterParam = action.payload.result?.filterCriteria;
      //state.flightAvailRQ.filterParam = action.payload.result?.filterCriteria; // Corrected assignment
      state.returnFlightList = action.payload.result?.flightReturnList;
      state.returnFilterParam = action.payload.result?.returnFilterCriteria;
      state.totalPages = action.payload.result?.totalPages;
      state.totalFlights = action.payload.result?.totalFlights;
      state.totalRetutrnPages = action.payload.result?.totalPagesReturn;
      state.totalReturnFlights = action.payload.result?.totalFlightsReturn;
    });
    builder.addCase(flightAvailResult.rejected, (state, action) => {
      
      state.loading = false;
      state.error = action.payload.message;
    });
    
    builder.addCase(flightExtraCharges.pending, (state) => {
      
      state.loading = true;
    });
    builder.addCase(flightExtraCharges.fulfilled, (state, action) => {
      
      state.loading = false;
      state.extraCHARGES = action.payload.result
    });
    builder.addCase(flightExtraCharges.rejected, (state, action) => {
      
      state.loading = false;
      state.error = action.payload.message;
    });

    // Similar handling for other async actions
    // ...

    builder.addCase(clearError, (state) => {
      state.error = "";
    });
  },
});

export const { clearError, updateFlightCart, updateSelectedFlight, updateSelectedReturnFlight } = flightSlice.actions;

export default flightSlice.reducer;
