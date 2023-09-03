import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  pickUpAddress: '',
  pickCords: {},
  destinationAddress: '',
  destinationCords: {},
  distance: 0
};

const LocationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setAddress: (state, actions) => {
      state[actions.payload.locType] = actions.payload.addr
    },
    setCoords: (state, actions) => {
      state[actions.payload.cordType] = actions.payload.currentLocation
    },
  }
});


export const {setAddress,setCoords } = LocationSlice.actions;
export default LocationSlice.reducer;