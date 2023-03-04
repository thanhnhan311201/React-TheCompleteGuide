import { configureStore } from "@reduxjs/toolkit";

import { default as AuthReducer } from "./authSlice";
import { default as CounterReducer } from "./counterSlice";

const store = configureStore({
  reducer: {
    counter: CounterReducer,
    auth: AuthReducer,
  },
});

export default store;
