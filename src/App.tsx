import { useEffect, useState } from "react";
import Header from "./components/header";
import {
  HandlerInputType,
  HandlerSubmitType,
  IAnimal,
  IAnimals,
} from "./types/types";
import { List } from "./components/List";

interface IAppState {
  value: string;
  data: IAnimal[];
  error: Error | null;
  isLoading: boolean;
}
const API_BASE_URL = "https://stapi.co/api/v1/rest/animal/search/";
const PAGE_SIZE = 12;

export const App = () => {
  const initialState: IAppState = {
    value: "",
    data: [],
    error: null,
    isLoading: false,
  };
  const [state, setState] = useState(initialState);
  const getData = async (value?: string) => {
    let response: Response | undefined = undefined;
    if (!value) {
      response = await fetch(
        `${API_BASE_URL}?pageNumber=1&pageSize=${PAGE_SIZE}`,
      );
    } else {
      response = await fetch(
        `${API_BASE_URL}?name=${value}&pageSize=${PAGE_SIZE}`,
        {
          method: "POST",
        },
      );
    }
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const animals: IAnimals = await response.json();
    return animals;
  };
  useEffect(() => {
    const loadData = async () => {
      try {
        setState((prevState) => ({ ...prevState, isLoading: true }));

        const lastQueryData: string | null = localStorage.getItem("lastQuery");
        if (lastQueryData) {
       
          const animals = await getData(lastQueryData);
      
          setState((prevState) => ({
            ...prevState,
            value: lastQueryData,
            data: animals.animals,
            error: null,
            isLoading: false,
          }));
        } else {
          const animals: IAnimals = await getData();
          setState((prevState) => ({
            ...prevState,
            data: animals.animals,
            error: null,
            isLoading: false,
          }));
        }
      } catch (error) {
        if (error instanceof Error) {
          setState((prev) => ({ ...prev, error: error as Error, data: [] }));
        }
      }
    };
    loadData();
  }, [setState]);
  const handleInputSearch: HandlerInputType = (event) => {
    setState({ ...state, value: event.currentTarget.value });
  };
  const handleSubmitSearch: HandlerSubmitType = async (event) => {
    event.preventDefault();
    try {
      setState({ ...state, isLoading: true });

      const animals: IAnimals = await getData(state.value);
      setState({ ...state, isLoading: false });
      setState({ ...state, data: animals.animals, error: null });
      localStorage.setItem("lastSearch", JSON.stringify(animals.animals));
      localStorage.setItem("lastQuery", state.value);
    } catch (error) {
      if (error instanceof Error) {
        setState({ ...state, error, data: [] });
      }
    }
  };

  return (
    <>
      {state.error ? (
        <div className="bg-white p-3 text-center text-red-500 font-bold">
          Error when loading data{state.error.message}
        </div>
      ) : null}
      {state.data ? (
        <>
          <Header
            handleInputSearch={handleInputSearch}
            handleSubmitSearch={handleSubmitSearch}
            value={state.value}
          />
          {state.isLoading && (
            <div className="flex justify-center items-center font-bold text-lg">
              <p>Loading...</p>
            </div>
          )}
          <List animals={state.data} />
        </>
      ) : null}
    </>
  );
};

export default App;
