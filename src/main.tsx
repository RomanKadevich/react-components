import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { MyErrorBoundary } from "./components/errorBoundary.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MyErrorBoundary>
      <App />
    </MyErrorBoundary>
  </React.StrictMode>,
);
