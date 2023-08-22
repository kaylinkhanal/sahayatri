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
    setPickupAddress: (state, actions) => {
     
    },
  }
});


export const {setUserDetails} = UserSlice.actions;
export default UserSlice.reducer;