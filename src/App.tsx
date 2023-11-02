import { useCallback, useEffect, useState } from "react";
import Header from "./components/header";
import {
  HandlerButtonType,
  HandlerInputType,
  HandlerSubmitType,
  IAnimal,
  IAnimals,
} from "./types/types";
import { List } from "./components/List";
import Pagination from "./components/Pagination";

interface IAppState {
  value: string;
  data: IAnimal[];
  error: Error | null;
  isLoading: boolean;
  pageNumber: number;
  currentPage: number;
}
const API_BASE_URL = "https://stapi.co/api/v1/rest/animal/search/";
const PAGE_SIZE = 12;

export const App = () => {
  const initialState: IAppState = {
    value: "",
    data: [],
    error: null,
    isLoading: false,
    pageNumber: 0,
    currentPage: 0,
  };
  const [state, setState] = useState(initialState);
  const paginate = (numOfPage: number) => {
    setState({ ...state, currentPage: numOfPage });
  };
  const handlePagination: HandlerButtonType = (event) => {
    const target = event.target as HTMLElement;
    if (target.textContent) {
      paginate(+target.textContent - 1);
    }
  };
  const handlePrev = () => {
    if (state.currentPage > 0) {
      setState((prevState) => ({
        ...prevState,
        currentPage: prevState.currentPage - 1,
      }));
    }
  };
  const handleNext = () => {
    if (state.currentPage < state.pageNumber - 1) {
      setState((prevState) => ({
        ...prevState,
        currentPage: prevState.currentPage + 1,
      }));
    }
  };
  const getData = useCallback(
    async (value?: string) => {
      let response: Response | undefined = undefined;
      if (!value) {
        response = await fetch(
          `${API_BASE_URL}?&pageNumber=${state.currentPage}&pageSize=${PAGE_SIZE}`,
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
    },
    [state.currentPage],
  );
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
            pageNumber: animals.page.totalPages,
          }));
        } else {
          const animals: IAnimals = await getData();
          setState((prevState) => ({
            ...prevState,
            data: animals.animals,
            error: null,
            isLoading: false,
            pageNumber: animals.page.totalPages,
          }));
        }
      } catch (error) {
        if (error instanceof Error) {
          setState((prev) => ({ ...prev, error: error as Error, data: [] }));
        }
      }
    };
    loadData();
  }, [state.currentPage, getData]);
  const handleInputSearch: HandlerInputType = (event) => {
    setState({ ...state, value: event.currentTarget.value });
  };
  const handleSubmitSearch: HandlerSubmitType = async (event) => {
    event.preventDefault();
    try {
      setState({ ...state, isLoading: true });

      const animals: IAnimals = await getData(state.value);
      setState({
        ...state,
        isLoading: false,
        data: animals.animals,
        error: null,
        pageNumber: animals.page.totalPages,
      });
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
            <div className="w-full h-full  flex justify-center  font-bold text-lg relative bg-black ">
              <p className="absolute top-[20vh] text-[2rem]">Loading...</p>
            </div>
          )}
          <List animals={state.data} />
          <Pagination
            pageNumber={state.pageNumber}
            paginate={handlePagination}
            handlePrev={handlePrev}
            handleNext={handleNext}
            pageIndex={state.currentPage + 1}
          />
        </>
      ) : null}
    </>
  );
};

export default App;
