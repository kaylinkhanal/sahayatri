import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  fds:'',
  tasks: ['buy coffee']
};

const todoSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addTodo: (state, actions) => {
    const z =  [...state.tasks, actions.payload]
    console.log(z)
    // state.tasks = z

    // return {
    //   ...state,
    //   tasks: z
    // }
      //update todo list here
    },
  },
});
export const {  addTodo } =
todoSlice.actions;
export default todoSlice.reducer;
