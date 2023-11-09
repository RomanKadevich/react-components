import { useContext } from "react";
import { HandlerInputType } from "../types/types";
import { ErrorBoundaryContext } from "./errorBoundary";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { stateContext } from "./ContextProvider";

export const Header = () => {
  const { searchValue, changeSearchValue } = useContext(stateContext);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const details = searchParams.get("details");
  const name = searchParams.get("name");
  const contextData = useContext(ErrorBoundaryContext);
  const handleInputSearch: HandlerInputType = (event) => {
    changeSearchValue(event.currentTarget.value);
  };
  return (
    <header
      className="p-16 bg-violet-950"
      onClick={() => {
        if (details) setSearchParams({ name: name || "", details: "" });
      }}
    >
      <div className="container mx-auto flex flex-wrap justify-center items-center gap-10">
        <h1 className="font-bold text-white text-[1.5rem]">Animals</h1>
        <input
          className="p-4 w-64 h-8"
          placeholder="Please enter your request"
          value={searchValue}
          onChange={handleInputSearch}
        ></input>
        <button
          onClick={() => {
            searchParams.set("name", searchValue);
            setSearchParams(searchParams);
            navigate("/1" + "?" + searchParams);
            localStorage.setItem("lastQuery", searchValue);
          }}
          className="w-8 h-8 bg-transparent bg-cover bg-[url('./assets/search.svg')] hover:scale-90 transition-opacity transition-transform ease-in-out duration-300"
        ></button>

        <button
          className="px-4 py-2 bg-violet-700 text-white rounded hover:bg-violet-600 ml-4"
          onClick={() =>
            contextData
              ? contextData.triggerError(new Error("Test error"))
              : undefined
          }
        >
          Test error
        </button>
      </div>
    </header>
  );
};

export default Header;
