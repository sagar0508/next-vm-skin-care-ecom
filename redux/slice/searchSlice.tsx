import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
interface SearchState {
  searchText: string;
}

const initialState: SearchState = {
  searchText: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    //// this this category events
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
  },
});

export const { setSearchText } = searchSlice.actions;

export default searchSlice.reducer;
