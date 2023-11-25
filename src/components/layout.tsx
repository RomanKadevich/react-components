import { ReactNode } from "react";
import Header from "./header";

interface ILayout {
  children: ReactNode;
}

export default function Layout({ children }: ILayout) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
