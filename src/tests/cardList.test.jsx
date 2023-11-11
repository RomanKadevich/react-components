import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  render,
  screen,
  fireEvent,
  findAllByRole,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import fetch from "node-fetch";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from "../components/List";
import Layout from "../components/Layout";
import Details from "../components/Details";
import { ContextProvider } from "../components/ContextProvider";
import { MyErrorBoundary } from "../components/errorBoundary";
import { MockAnimal } from "./moks";
import { Path, server } from "./handlers";
import { HttpResponse, http } from "msw";
import App from "../components/App";

describe("App", () => {
  beforeAll(() => server.listen());
  beforeEach(() =>
    render(
      <ContextProvider>
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
      </ContextProvider>,
    ),
  );
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should check correct list item", async () => {
    // Ваш вызов fetch и ожидаемые утверждения должны быть здесь
    // Например:
    // const response = await fetch("https://stapi.co/api/v1/rest/animal/search/?&pageNumber=1&pageSize=12", {
    //   method: "POST",
    // });
    // const data = await response.json();
    // console.log("Response data:", data);
    // Добавьте утверждения, если необходимо

    const list = await screen.findAllByTestId("card-item");
    expect(list).toHaveLength(12);
    console.log(list);
  });
});
