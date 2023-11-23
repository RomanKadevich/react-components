// import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
// import { render, screen, fireEvent, act } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import { server } from "./handlers";
// import App from "../../../src/App";
// import { Provider } from "react-redux";
// import store from "../../../src/store";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Pagination from "../../../src/components/Pagination";
// import { MyErrorBoundary } from "../../../src/components/errorBoundary";
// import NotFound from "../../../src/components/NotFound";

// describe("App", () => {
//   beforeAll(() => server.listen());
//   afterEach(() => server.resetHandlers());
//   afterAll(() => server.close());

//   it("should check correct list item", async () => {
//     render(
//       <Provider store={store}>
//         <App />
//       </Provider>,
//     );
//     const list = await screen.findAllByTestId("card-item");
//     expect(list).toHaveLength(12);
//   });

//   it("should show no cards if no data", async () => {
//     render(
//       <Provider store={store}>
//         <App />
//       </Provider>,
//     );
//     const searchBtn = await screen.findByTestId("search");
//     const input = await screen.findByTestId("input");
//     const badQuery = "fwefqweqwef";
//     act(() => {
//       fireEvent.change(input, { target: { value: badQuery } });
//       fireEvent.click(searchBtn);
//     });
//     const noCardsNote = await screen.findByText("No cards");
//     expect(noCardsNote).toBeInTheDocument();
//   });

//   it("should render the relevant card data", async () => {
//     render(
//       <Provider store={store}>
//         <App />
//       </Provider>,
//     );
//     const searchBtn = await screen.findByTestId("search");
//     const input = await screen.findByTestId("input");
//     const Query = "Albatross";
//     act(() => {
//       fireEvent.change(input, { target: { value: Query } });
//       fireEvent.click(searchBtn);
//     });
//     const title = await screen.findByText("Abalone");

//     expect(title).toBeTruthy();
//     const firstCard = 1;
//     const list = await screen.findAllByTestId("card-text-list");
//     const item = list[firstCard];
//     expect(item.textContent).toContain("Canine");
//     expect(item.textContent).toContain("Earth Animal");
//     expect(item.textContent).toContain("Feline");
//     expect(item.textContent).toContain("Earth Insect");
//   });

//   it("should render detail component on click", async () => {
//     render(
//       <Provider store={store}>
//         <App />
//       </Provider>,
//     );
//     const card = await screen.findAllByTestId("card-item");
//     const firstCard = 0;
//     act(() => {
//       fireEvent.click(card[firstCard]);
//     });
//     const detailCard = await screen.findByTestId("details");

//     expect(detailCard).toBeInTheDocument();
//   });

//   it("should render loading during fetch details", async () => {
//     render(
//       <Provider store={store}>
//         <App />
//       </Provider>,
//     );

//     const card = await screen.findAllByTestId("card-item");
//     const firstCard = 0;
//     act(() => {
//       fireEvent.click(card[firstCard]);
//     });

//     expect(card).toBeTruthy();
//   });

//   it("should render correct data in the details", async () => {
//     render(
//       <Provider store={store}>
//         <App />
//       </Provider>,
//     );

//     const card = await screen.findAllByTestId("card-item");
//     const firstCard = 1;
//     act(() => {
//       fireEvent.click(card[firstCard]);
//     });
//     const detailCard = await screen.findByTestId("details");
//     expect(detailCard.textContent).toContain("Canine");
//     expect(detailCard.textContent).toContain("Earth Animal");
//     expect(detailCard.textContent).toContain("Feline");
//     expect(detailCard.textContent).toContain("Earth Insect");
//   });

//   it("should hide the  details by clicking on the area outside", async () => {
//     render(
//       <Provider store={store}>
//         <App />
//       </Provider>,
//     );

//     const card = await screen.findAllByTestId("card-item");
//     const firstCard = 1;

//     act(() => {
//       fireEvent.click(card[firstCard]);
//     });

//     const outsideAreaDetailCard = await screen.findByTestId("outside-details");
//     act(() => {
//       fireEvent.click(outsideAreaDetailCard);
//     });
//     const closeDetailCardWrapper = await screen.findByTestId("details-wrapper");
//     expect(closeDetailCardWrapper).toHaveClass("hidden");
//     act(() => {
//       fireEvent.click(card[firstCard]);
//     });
//   });

//   it("should update URL query parameter when page changes", async () => {
//     render(
//       <Provider store={store}>
//         <App />
//       </Provider>,
//     );
//     await screen.findAllByTestId("card-item");
//     const nextBtn = await screen.findByTestId("next");
//     act(() => {
//       fireEvent.click(nextBtn);
//     });
//     render(
//       <Provider store={store}>
//         <App />
//       </Provider>,
//     );
//     expect(window.location.pathname).toBe("/1");
//   });

//   it("should мerify that clicking the Search button saves the entered value to the local storage", async () => {
//     render(
//       <Provider store={store}>
//         <App />
//       </Provider>,
//     );
//     const searchBtn = await screen.findByTestId("search");
//     const input = await screen.findByTestId("input");
//     const Query = "test";
//     act(() => {
//       fireEvent.change(input, { target: { value: Query } });
//       fireEvent.click(searchBtn);
//     });
//     const storedData = localStorage.getItem("lastQuery");
//     expect(storedData).toEqual(Query);
//   });

//   it("should render Pagination", async () => {
//     const component = render(
//       <BrowserRouter>
//         <Pagination pageIndex={1} pageNumber={1} />
//       </BrowserRouter>,
//     );
//     expect(component).toMatchSnapshot();
//   });

//   it("should render page not found", async () => {
//     render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <Routes>
//             <Route path="/" element={<App />} />
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </BrowserRouter>
//       </Provider>,
//     );

//     window.history.pushState({}, "Test page", "/incorrect");

//     const component = screen.getByTestId("404");
//     expect(component).toBeTruthy();
//   });

//   it("should render error boundary component", async () => {
//     const ErrorComponent = () => {
//       throw new Error("Simulated error");
//     };
//     render(
//       <MyErrorBoundary>
//         <ErrorComponent />
//       </MyErrorBoundary>,
//     );
//     const errorBoundaryView = screen.getByTestId("error-boundary");
//     expect(errorBoundaryView).toBeTruthy();
//   });

//   it("should render header", async () => {
//     render(
//       <Provider store={store}>
//         <App />
//       </Provider>,
//     );
//     const headerBlock = screen.getByTestId("header");
//     expect(headerBlock).toBeTruthy();
//   });
//     it("should render App", async () => {
//   render(

//         <App />

//     );
//     const text = screen.getByText("Hello");
//     expect(text).toBeTruthy();
//   });
// });
import { describe, expect, test } from "vitest";

const add = (a: number, b: number) => {
  return a + b;
};
describe("test add function", () => {
  test("should return the sum of two numbers", () => {
    const result = add(2, 3);
    expect(result).toBe(5);
  });
});
