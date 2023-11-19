import { useEffect } from "react";
import { List } from "../components/List";
import Pagination from "../components/Pagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDataAnimals } from "../hooks/useDataAnimals";

export const MainPage = () => {
  const navigate = useNavigate();
  const {
    data,
    loading,
    error,
    page,
    searchParamsName,
    searchParamsDetails,
    pageNumber,
  } = useDataAnimals();
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    const lastQueryData: string | null = localStorage.getItem("lastQuery");
    if (!lastQueryData) {
      navigate("/1");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      onClick={() => {
        if (searchParamsDetails)
          setSearchParams({ name: searchParamsName || "", details: "" });
      }}
      className={searchParamsDetails ? "blur-sm" : ""}
    >
      {error ? (
        <div className="bg-white p-3 text-center text-red-500 font-bold">
          Error when loading data {"error" in error ? error.error : ""}
        </div>
      ) : null}
      {data ? (
        <>
          {loading && !searchParamsDetails && (
            <div className="w-full h-full  flex justify-center  font-bold text-lg relative bg-black ">
              <p className="absolute top-[20vh] text-[2rem]">Loading...</p>
            </div>
          )}
          {!loading && data.length === 0 && <p>No cards</p>}
          <List />
          <Pagination
            pageIndex={page ? +page : 1}
            pageNumber={pageNumber ?? 1}
          />
        </>
      ) : null}
    </div>
  );
};
export default MainPage;
