import { createSlice } from "@reduxjs/toolkit";

const jwdStore = createSlice({
  name: "jwd",
  initialState: {
    longitudeAndLatitude: "121,31",// 经纬度
  },
  reducers: {
    setLongitudeAndLatitude: (state, action) => {
      state.longitudeAndLatitude = action.payload;
    },
  },
});

export const { setLongitudeAndLatitude } = jwdStore.actions;

const reducers = jwdStore.reducer;

export default reducers;
