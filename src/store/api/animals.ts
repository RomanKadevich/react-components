import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiBaseUrl, pageSize } from "./api_env";
import { IAnimal, IAnimals } from "../../types/types";

export const animalsApi = createApi({
  reducerPath: "animals/api",
  baseQuery: fetchBaseQuery({ baseUrl: apiBaseUrl }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    searchAnimals: build.query<IAnimal[], { search: string; page: string }>({
      query: ({ search, page }) => ({
        url: "",
        method: "POST",
        params: {
          pageNumber: `${page ? +page - 1 : 1}`,
          pageSize: pageSize,
          name: search,
        },
      }),
      transformResponse: (response: IAnimals) => response.animals,
    }),
  }),
});

export const { useSearchAnimalsQuery } = animalsApi;
