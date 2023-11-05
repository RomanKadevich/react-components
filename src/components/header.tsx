import { useContext, useState } from "react";
import { HandlerInputType } from "../types/types";
// import { HandlerSubmitType } from "../types/types";
import { ErrorBoundaryContext } from "./errorBoundary";
import { useNavigate, useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export const Header = () => {
  const params = useParams();
  console.log(params.page);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const contextData = useContext(ErrorBoundaryContext);
  const lastQuery = localStorage.getItem("lastQuery");
  const [value, setValue] = useState<string>(lastQuery ? lastQuery : "");
  const handleInputSearch: HandlerInputType = (event) => {
    setValue(event.currentTarget.value);
  };
  return (
    <header className="p-16 bg-violet-950">
      <div className="container mx-auto flex flex-wrap justify-center items-center gap-10">
        <h1 className="font-bold text-white text-[1.5rem]">Animals</h1>
        <input
          className="p-4 w-64 h-8"
          placeholder="Please enter your request"
          value={value}
          onChange={handleInputSearch}
        ></input>
        <button
          onClick={() => {
            searchParams.set("name", value);
            setSearchParams(searchParams);
            navigate("/1" + "?" + searchParams);
            localStorage.setItem("lastQuery", value);
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
