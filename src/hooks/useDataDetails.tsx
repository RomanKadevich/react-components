import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IAnimal } from "../types/types";
import { useSearchAnimalsQuery } from "../store/api/animals";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

interface IDetailsState {
  data: IAnimal | undefined;
  error: FetchBaseQueryError | SerializedError | undefined;
  isLoading: boolean;
}

export const useDataDetails = () => {
  const [searchParams] = useSearchParams();

  const details = searchParams.get("details");
  const initialState: IDetailsState = {
    data: undefined,
    error: undefined,
    isLoading: false,
  };

  const [state, setState] = useState(initialState);
  const { data, isFetching, error } = useSearchAnimalsQuery({
    search: details ?? "",
    page: "0",
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      data: data ? data.animals[0] : undefined,
      error: error,
      isLoading: isFetching,
    }));
  }, [details, data, error, isFetching]);

  return { ...state };
};
