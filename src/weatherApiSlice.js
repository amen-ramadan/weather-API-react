import { createSlice } from "@reduxjs/toolkit";

const weatherApiSlice = createSlice({
  name: "weatherApi",
  initialState: {
    result: "empty",
  },
  reducers: {
    setWeather: (state, action) => {
      state.result = "changed";
    },
  },
} );

export const { setWeather } = weatherApiSlice.actions ;
export default weatherApiSlice.reducer;