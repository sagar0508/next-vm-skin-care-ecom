// import { EventBookingProps } from "@/types/event";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// const initialState: { bookingData: EventBookingProps } = {
//   bookingData: {
//     _id: "",
//     clientId: "",
//     occasionTypeId: "",
//     honorees: {},
//     start_date: null,
//     end_date: null,
//     venueId: "",
//     venueNote: "",
//     functions: [
//       // {
//       //   id: "1",
//       //   name: "",
//       //   dateTime: new Date(),
//       //   subVenue: "",
//       // },
//     ],
//     selectedAdditionalProps: [],
//     services: [],
//     decorItems: [],
//     vendors: [],
//     payments: [],
//     totalEstimate: 0,
//     discount: 0,
//     tax: 0,
//     advanceAmount: 0,
//     vendorAssignments: [],
//     advancePayments: [],
//     status: "draft",
//     // createdAt: "",
//     // updatedAt: "",

//     servicesPricing: {},
//     decorPricing: {},
//     selectedServices: [],
//     selectedDecor: [],
//     completedFunctions: [],
//     vendorSettlements: [],
//     finalPayments: [],
//   },
// };

// export const bookingDataSlice = createSlice({
//   name: "bookingData",
//   initialState,
//   reducers: {
//     // ✅ Update specific booking field by id
//     updateBookingField: <K extends keyof EventBookingProps>(
//       state,
//       action: PayloadAction<{ key: K; value: EventBookingProps[K] }>
//     ) => {
//       const { key, value } = action.payload;

//       state.bookingData[key] = value;
//       // state.bookingData.updatedAt = new Date();
//       console.log("action.payload-->", action.payload);
//     },

//     // ✅ Replace whole booking object (step save)
//     updateBooking: (state, action: PayloadAction<EventBookingProps>) => {
//       console.log("action.payload--update-booking", action.payload);
//       state.bookingData = action.payload;
//     },

//     // // ✅ Add new booking (new workflow)
//     // addBooking: (state, action: PayloadAction<EventBookingProps>) => {
//     //   state.bookingData.push(action.payload);
//     // },
//     clearBooking: (state) => {
//       state.bookingData = initialState?.bookingData;
//     },
//   },
// });

// export const { updateBookingField, clearBooking, updateBooking } =
//   bookingDataSlice.actions;

// export default bookingDataSlice.reducer;
