import "./index.css";
import { MyErrorBoundary } from "./components/errorBoundary.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Details from "./components/Details";
import { ContextProvider } from "./components/ContextProvider";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <ContextProvider>
      <MyErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Details />} />
              <Route path="/:page" element={<Details />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </MyErrorBoundary>
    </ContextProvider>
  );
};

export default App;
