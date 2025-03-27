import { BaseQueryFn } from "@/types/BaseQueryFn";
import { IOutfit } from "@/types/types";
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
    // headers.set("Content-Type", "application/json");
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
    getAllOutfits: build.query<IOutfit[], void>({
      query: () => `/outfits/`,
    }),
    getOutfit: build.query<IOutfit, { id: string }>({
      query: ({ id }) => `/outfits/${id}`,
    }),
    createOutfit: build.mutation<void, FormData>({
      query: (data) => ({
        url: `/outfits/`,
        method: "POST",
        body: data,
      }),
    }),
    updateOutfit: build.mutation<void, FormData>({
      query: (data) => ({
        url: `/outfits/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteOutfit: build.mutation<void, { id: string }>({
      query: (data) => ({
        url: `/outfits/`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});
