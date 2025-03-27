import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { API } from "./api";
import { rtkQueryErrorLogger } from "./ErrorsHandler";

const combinedReducer = combineReducers({
  [API.reducerPath]: API.reducer,
});

export const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(API.middleware).concat(rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
