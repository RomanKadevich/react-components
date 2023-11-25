import { useContext, useState } from "react";
import { ErrorBoundaryContext } from "./errorBoundary";
import { HandlerInputType } from "@/types/types";
import { useRouter } from "next/router";

export const Header = () => {
  const contextData = useContext(ErrorBoundaryContext);
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const handleInputSearch: HandlerInputType = (event) => {
    setSearchValue(event.currentTarget.value);
  };
  const handleInputSubmit = () => {
    router.push({
      pathname: "/1",
      query: {
        name: searchValue,
      },
    });
  };

  return (
    <header className="p-16 bg-violet-950" data-testid="header">
      <div className="container mx-auto flex flex-wrap justify-center items-center gap-10">
        <h1 className="font-bold text-white text-[1.5rem]">Animals</h1>
        <input
          className="p-4 w-64 h-8"
          placeholder="Please enter your request"
          value={searchValue}
          onChange={handleInputSearch}
          data-testid={`input`}
        ></input>
        <button
          onClick={handleInputSubmit}
          data-testid={`search`}
          className="w-8 h-8 bg-cover bg-transparent bg-searchBg hover:scale-90 transition-opacity transition-transform ease-in-out duration-300 "
        ></button>

        <button
          className="px-4 py-2 bg-violet-700 text-white rounded hover:bg-violet-600 ml-4 "
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
