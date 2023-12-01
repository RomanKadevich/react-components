import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/mainPage";

import { Layout } from "./comonents/Layout";
import { FormNonContol } from "./comonents/FormNonContoll";
import Form from "./comonents/Form";

function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />

          <Route path="control-form" element={<Form />} />

          <Route path="uncontrol-form" element={<FormNonContol />} />
        </Route>

      </Routes></BrowserRouter>
  );
}

export default App;
