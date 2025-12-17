import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import authReducer from "../slice/authSlice";
import searchTextReducer from "../slice/searchSlice";
import apiQueryParamsReducer from "../slice/apiQuerySlice";
// import bookingDataPersistReducer from "../slice/bookingDataSlice";

// Persist configuration
const authPersistConfig = {
  key: "auth",
  version: 1,
  storage,
};

const searchPersistConfig = {
  key: "search",
  version: 1,
  storage,
};

const apiQueryParamsPersistConfig = {
  key: "apiQueryParams",
  version: 1,
  storage,
};
const bookingDataPersistConfig = {
  key: "bookingData",
  version: 1,
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const persistedSearchTextReducer = persistReducer(
  searchPersistConfig,
  searchTextReducer
);
const persistedApiQueryParamsReducer = persistReducer(
  apiQueryParamsPersistConfig,
  apiQueryParamsReducer
);
// const persistedBookingDataReducer = persistReducer(
//   bookingDataPersistConfig,
//   bookingDataPersistReducer
// );

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    search: persistedSearchTextReducer,
    apiQueryParams: persistedApiQueryParamsReducer,
    // bookingData: persistedBookingDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
