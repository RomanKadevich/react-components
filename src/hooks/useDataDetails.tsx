import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IAnimal, IAnimals } from "../types/types";
import { apiBaseUrl } from "../api-service/api_env";
import { Api } from "../api-service/api";

interface IDetailsState {
  data: IAnimal | null;
  error: Error | null;
  isLoading: boolean;
}

export const useDataDetails = () => {
  const [searchParams] = useSearchParams();
  const details = searchParams.get("details");

  const initialState: IDetailsState = {
    data: null,
    error: null,
    isLoading: false,
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const apiService = new Api(apiBaseUrl);
    const loadData = async () => {
      try {
        setState((prevState) => ({ ...prevState, isLoading: true }));
        const animals: IAnimals = await apiService.getItems(details);
        const detailAnimal: IAnimal = animals.animals[0];
        setState((prevState) => ({
          ...prevState,
          data: detailAnimal,
          error: null,
          isLoading: false,
        }));
      } catch (error) {
        if (error instanceof Error) {
          setState((prev) => ({ ...prev, error: error as Error, data: null }));
        }
      }
    };
    loadData();
  }, [details]);
  return { ...state };
};
