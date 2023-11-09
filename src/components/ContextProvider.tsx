import { ReactNode, createContext } from "react";
interface ICartContext {
  children: ReactNode;
}
export interface IContext {
  search: string;
}

export const stateContext = createContext<IContext>({ search: "" });
export const ContextProvider = ({ children }: ICartContext) => {
  return (
    <stateContext.Provider value={{ search: "Roma" }}>
      {children}
    </stateContext.Provider>
  );
};
