import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { postApi } from "./services/postApi";
import { postSlice, filtersSlice } from "./slices";

const rootReducer = combineReducers({
  [postApi.reducerPath]: postApi.reducer,
  post: postSlice,
  filters: filtersSlice,
});

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(postApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
