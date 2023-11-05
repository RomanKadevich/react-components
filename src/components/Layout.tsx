import { Outlet, useSearchParams } from "react-router-dom";
import App from "./App";
import Header from "./header";
const Layout = () => {
  const [searchParams] = useSearchParams();
  const details = searchParams.get("details");
  return (
    <>
      <Header />
      <div className="flex">
        <div className={`w-full ${details ? "basis-1/2" : "basis-full"}`}>
          <App />
        </div>
        <div
          className={`${
            details ? "block" : "hidden"
          } w-full basis-1/2 flex justify-center items-start mt-10 border-l-2 border-black`}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
