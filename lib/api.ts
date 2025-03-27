import { BaseQueryFn } from "@/types/BaseQueryFn";
import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
//   import * as SecureStore from "expo-secure-store";

const baseQuery = fetchBaseQuery({
  //   baseUrl: `${process.env.EXPO_PUBLIC_API_URL}`,
  baseUrl: `${process.env.EXPO_PUBLIC_API_URL}`,
  credentials: "include",
  prepareHeaders: (headers) => {
    //   const token = SecureStore.getItem("session");
    //   headers.set("Authorization", `${token}`);
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

// const baseQueryWithChange: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api: any, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);
//   if (result.data && typeof result.data === "object" && "body" in result.data) {
//     return { ...result, data: result.data.body };
//   }
//   return result;
// };

export const API = createApi({
  reducerPath: "API",
  baseQuery: baseQuery as BaseQueryFn,
  endpoints: (build) => ({
    getOutfits: build.query<{ username: string }, void>({
      //   query: () => `/outfits`,
      query: () => `/outfits/`,
    }),
    //   fetchSignIn: build.mutation<ISignInResponse, ISignInValues>({
    //     query: (data) => ({
    //       url: "/common/auth",
    //       method: "POST",
    //       body: data,
    //     }),
    //   }),
  }),
});
