import { useCallback, useContext, useEffect } from "react";
import { IAnimals } from "../types/types";
import { List } from "./List";
import Pagination from "./Pagination";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { stateContext } from "./ContextProvider";

const API_BASE_URL = "https://stapi.co/api/v1/rest/animal/search/";

const PAGE_SIZE = 12;
export const MainPage = () => {
  const { appList, updateAppList } = useContext(stateContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name");
  const details = searchParams.get("details");
  const { page } = useParams();
  const navigate = useNavigate();
  const getData = useCallback(
    async (search?: string | null) => {
      let response: Response | undefined = undefined;
      if (!search) {
        response = await fetch(
          `${API_BASE_URL}?&pageNumber=${
            page ? +page - 1 : 1
          }&pageSize=${PAGE_SIZE}&name=`,
          {
            method: "POST",
          },
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
        updateAppList({ isLoading: true });
        const lastQueryData: string | null = localStorage.getItem("lastQuery");
        if (lastQueryData) {
          navigate("/1");
          const animals = await getData(lastQueryData);

          updateAppList({
            data: animals.animals,
            error: null,
            isLoading: false,
            pageNumber: animals.page.totalPages,
          });
        } else {
          navigate("/1");
          searchParams.set("name", "");
          setSearchParams(searchParams);
          const animals: IAnimals = await getData(name);
          updateAppList({
            data: animals.animals,
            error: null,
            isLoading: false,
            pageNumber: animals.page.totalPages,
          });
        }
      } catch (error) {
        if (error instanceof Error) {
          updateAppList({ error: error as Error, data: [] });
        }
      }
    };
    loadData();
  }, [getData, navigate, name, page, setSearchParams, searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      onClick={() => {
        if (details) setSearchParams({ name: name || "", details: "" });
      }}
      className={details ? "blur-sm" : ""}
    >
      {appList.error ? (
        <div className="bg-white p-3 text-center text-red-500 font-bold">
          Error when loading data{appList.error.message}
        </div>
      ) : null}
      {appList.data ? (
        <>
          {appList.isLoading && !details && (
            <div className="w-full h-full  flex justify-center  font-bold text-lg relative bg-black ">
              <p className="absolute top-[20vh] text-[2rem]">Loading...</p>
            </div>
          )}
          {!appList.isLoading && appList.data.length === 0 && <p>No cards</p>}
          <List />
          <Pagination pageIndex={page ? +page : 1} />
        </>
      ) : null}
    </div>
  );
};
export default MainPage;
