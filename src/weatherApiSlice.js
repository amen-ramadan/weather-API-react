import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchWeather = createAsyncThunk( "weather/fetchWeather", async () =>
{
  const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather?lat=35.56200&lon=45.31700&appid=24f7438ece98c2de5a5ce455b4f63b43",

      )
        const number = Math.round(response.data.main.temp - 273.15);
        const min = Math.round(response.data.main.temp_min - 273.15);
        const max = Math.round(response.data.main.temp_max - 273.15);
        const description = response.data.weather[0].description;
        const icon = response.data.weather[0].icon;

        return { number, min, max, description, icon: `https://openweathermap.org/img/wn/${icon}@4x.png` };
      
})
const weatherApiSlice = createSlice({
  name: "weatherApi",
  initialState: {
    result: "empty",
    weather: {},
    isLoading: false,
  },
  reducers: {
    setWeather: (state, action) => {
      state.result = "changed";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.result = "fulfilled";
        state.weather = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
} );

export const { setWeather } = weatherApiSlice.actions ;
export default weatherApiSlice.reducer;