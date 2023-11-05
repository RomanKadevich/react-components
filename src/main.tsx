import React from "react";
import ReactDOM from "react-dom/client";
import { MainPage } from "./components/mainPage";
import "./index.css";
import { MyErrorBoundary } from "./components/errorBoundary.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MyErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:page" element={<MainPage />} />
        </Routes>
        {/* <App /> */}
      </BrowserRouter>
    </MyErrorBoundary>
  </React.StrictMode>,
);
