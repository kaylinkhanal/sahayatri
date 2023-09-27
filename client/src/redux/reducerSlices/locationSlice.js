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
 
    setMapCordsInBulk : (state, actions) => {
      const {destinationCoords,pickupCoords,pickUpAddress,destinationAddress,distance } = actions.payload
      return {
        ...state,
        pickUpAddress,
        pickCords: pickupCoords,
        destinationAddress,
        destinationCords: destinationCoords,
        distance
      }
    },
  }
});


export const {setAddress,setCoords,setMapCordsInBulk } = LocationSlice.actions;
export default LocationSlice.reducer;