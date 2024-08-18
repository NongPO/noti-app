import { configureStore } from "@reduxjs/toolkit";

import callApiReducer from "./callApi";

export default configureStore({
    reducer: {
      callApi: callApiReducer,

    },
  });