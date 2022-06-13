import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./usersSlice";

const reducer = combineReducers({
  users: userReducer,
});

const store = configureStore({
  reducer,
});

export default store;
