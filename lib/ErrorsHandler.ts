import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import { router } from "expo-router";

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action: any) => {
    if (isRejectedWithValue(action)) {
      //   if (action.payload.status == 401) {
      //     SecureStore.deleteItemAsync("session");
      //     api.dispatch({ type: "user/resetUser" });
      //     router.push("/auth/sign-in");
      //   }
    }

    return next(action);
  };
