// import { EventBookingMetaData } from "@/types/authSlice.type";
import { EventBookingMetaData } from "@/types/authSlice.type";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import {
//   PaginationState,
//   QueryParamsInitialState,
// } from "../../types/howToVideo.type";

interface PaginationState {
  pagination: {
    page: number;
    limit: number;
  };
  filters: Partial<{
    propsCategory?: string;
    ownershipType?: string;
    date_filter: string;
    start_date: string;
    end_date: string;
    status: string;
    category: string;
  }>;
  metaData: EventBookingMetaData;
}

const initialState: PaginationState = {
  pagination: {
    page: 1,
    limit: 10,
  },
  filters: { date_filter: "all", status: "all" },
  metaData: {
    clients: [],
    subLocations: [],
    vendors: [],
    venues: [],
    occasions: [],
    themes: [],
    services: [],
    propsList: [],
  },
};

export const apiQuerySlice = createSlice({
  name: "apiQueryParams",
  initialState,
  reducers: {
    //// this this category events
    setPagination: (
      state,
      action: PayloadAction<PaginationState["pagination"]>
    ) => {
      state.pagination = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<{
        category: keyof PaginationState["filters"];
        value: string;
      }>
    ) => {
      console.log("category-value9", action.payload);
      const { category, value } = action.payload;
      // if (!state.filters) {
      //   state.filters = { date_filter: "all" };
      // }

      const normalizedValue = value.trim().toLowerCase();

      // Handle reset or duplicate selection
      if (
        (normalizedValue === "all" ||
          normalizedValue === "both" ||
          normalizedValue === "") &&
        category !== "status"
      ) {
        delete state.filters[category];
      } else if (
        state.filters[category] === value &&
        state.filters[category] !== "custom" &&
        !["start_date", "end_date"].includes(category) &&
        category !== "status"
      ) {
        delete state.filters[category]; // toggle off if same
      } else {
        state.filters[category] = value;
      }
    },

    clearFilters: (state) => {
      state.pagination.page = 1;
      state.filters = {
        date_filter: "all",
        // date_filter: "last_7_days",
        // start_date: moment(start_date).format("YYYY-MM-DD[T]HH:mm:ss.SSS"),
        // end_date: moment(end_date).format("YYYY-MM-DD[T]HH:mm:ss.SSS"),
      };
    },
    setMetaData: (state, action: PayloadAction<EventBookingMetaData>) => {
      state.metaData = action.payload;
    },

    clearMetaData: (state) => {
      state.metaData = {
        clients: [],
        vendors: [],
        subLocations: [],
        venues: [],
        occasions: [],
        themes: [],
        services: [],
        propsList: [],
      };
    },
  },
});

export const {
  setPagination,
  setFilters,
  clearFilters,
  setMetaData,
  clearMetaData,
} = apiQuerySlice.actions;

export default apiQuerySlice.reducer;
