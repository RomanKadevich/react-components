import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { MyErrorBoundary } from "./components/errorBoundary.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Details from "./components/Details";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MyErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Details />} />
            <Route path="/:page" element={<Details />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MyErrorBoundary>
  </React.StrictMode>,
);
