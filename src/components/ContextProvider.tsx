import { ReactElement, createContext, useState } from "react";
import { IAppState, IContext } from "../types/types";
interface ICartContext {
  children: ReactElement;
}

const initialState: IAppState = {
  data: [],
  error: null,
  isLoading: false,
  pageNumber: 0,
};
const lastQuery = localStorage.getItem("lastQuery");
export const stateContext = createContext<IContext>({
  searchValue: lastQuery ? lastQuery : "",
  appList: initialState,
  updateAppList: () => undefined,
  changeSearchValue: () => undefined,
});
export const ContextProvider = ({ children }: ICartContext) => {
  const [searchValue, setSearchValue] = useState<string>(
    lastQuery ? lastQuery : "",
  );
  const [appState, setAppState] = useState(initialState);
  const changeValue = (newSearchValue: string) => {
    setSearchValue(newSearchValue);
  };
  const updateList = (state: Partial<IAppState>) => {
    setAppState((prevState) => ({ ...prevState, ...state }));
  };
  return (
    <stateContext.Provider
      value={{
        searchValue: searchValue,
        appList: appState,
        updateAppList: updateList,
        changeSearchValue: changeValue,
      }}
    >
      {children}
    </stateContext.Provider>
  );
};
