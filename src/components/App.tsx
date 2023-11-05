import { useCallback, useEffect, useState } from "react";
import { IAnimal, IAnimals } from "../types/types";
import { List } from "./List";
import Pagination from "./Pagination";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

interface IAppState {
  data: IAnimal[];
  error: Error | null;
  isLoading: boolean;
  pageNumber: number;
}
const API_BASE_URL = "https://stapi.co/api/v1/rest/animal/search/";

const PAGE_SIZE = 12;

export const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name");
  const details = searchParams.get("details");
  const { page } = useParams();
  const navigate = useNavigate();
  const initialState: IAppState = {
    data: [],
    error: null,
    isLoading: false,
    pageNumber: 0,
  };
  const [state, setState] = useState(initialState);
  const getData = useCallback(
    async (search?: string | null) => {
      let response: Response | undefined = undefined;
      if (!search) {
        response = await fetch(
          `${API_BASE_URL}?&pageNumber=${
            page ? +page - 1 : 1
          }&pageSize=${PAGE_SIZE}`,
        );
      } else {
        response = await fetch(
          `${API_BASE_URL}?&pageNumber=${
            page ? +page - 1 : 1
          }&name=${search}&pageSize=${PAGE_SIZE}`,
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
    [page],
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
            data: animals.animals,
            error: null,
            isLoading: false,
            pageNumber: animals.page.totalPages,
          }));
        } else {
          searchParams.set("name", "");
          setSearchParams(searchParams);
          const animals: IAnimals = await getData(name);
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
  }, [getData, navigate, name, page, setSearchParams, searchParams]);

  return (
    <div
      onClick={() => {
        if (details) setSearchParams({ name: name || "", details: "" });
      }}
      className={details ? "blur-sm" : ""}
    >
      {state.error ? (
        <div className="bg-white p-3 text-center text-red-500 font-bold">
          Error when loading data{state.error.message}
        </div>
      ) : null}
      {state.data ? (
        <>
          {state.isLoading && (
            <div className="w-full h-full  flex justify-center  font-bold text-lg relative bg-black ">
              <p className="absolute top-[20vh] text-[2rem]">Loading...</p>
            </div>
          )}
          <List animals={state.data} />
          <Pagination
            pageNumber={state.pageNumber}
            pageIndex={page ? +page : 1}
          />
        </>
      ) : null}
    </div>
  );
};

export default App;
