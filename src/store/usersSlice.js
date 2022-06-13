import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "Users",
  initialState: {
    value: [],
    name: "Users data",
  },
  reducers: {
    setUsers: (state, action) => {
      const users = action.payload;
      state.value = users;
    },
  },
});

export const { setUsers } = usersSlice.actions;

export default usersSlice.reducer;
