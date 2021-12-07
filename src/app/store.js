import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi, cryptoApiList } from "../services/cryptoApi";
import { cryptoNewsApi } from "../services/cryptoNewsApi";

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    [cryptoApiList.reducerPath]: cryptoApiList.reducer,
  },
});
