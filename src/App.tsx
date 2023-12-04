import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/mainPage";

import { Layout } from "./comonents/Layout";

import FormControl from "./comonents/FormControl";
import FormUncontol from "./comonents/FormUncontol";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />

          <Route path="control-form" element={<FormControl />} />

          <Route path="uncontrol-form" element={<FormUncontol />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
