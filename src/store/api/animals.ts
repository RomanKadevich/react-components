import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiBaseUrl, pageSize } from "./api_env";
import { IAnimals } from "../../types/types";
import { HYDRATE } from "next-redux-wrapper";

export const animalsApi = createApi({
  reducerPath: "animals/api",
  baseQuery: fetchBaseQuery({ baseUrl: apiBaseUrl }),
  refetchOnFocus: true,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    getSearchAnimals: build.query<IAnimals, { search: string; page: string }>({
      query: ({ search, page }) => ({
        url: "",
        method: "POST",
        params: {
          pageNumber: `${page ? +page - 1 : 1}`,
          pageSize: pageSize,
          name: search,
        },
      }),
      transformResponse: (response: IAnimals) => response,
    }),
  }),
});

export const { useGetSearchAnimalsQuery,  util: { getRunningQueriesThunk } } = animalsApi;

export const {getSearchAnimals}= animalsApi.endpoints
