import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { server } from "./handlers";
import App from "../App";

describe("App", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should check correct list item", async () => {
    render(<App />);
    const list = await screen.findAllByTestId("card-item");
    expect(list).toHaveLength(12);
  });
  it("should show no cards if no data", async () => {
    render(<App />);
    const searchBtn = await screen.findByTestId("search");
    const input = await screen.findByTestId("input");
    const badQuery = "fwefqweqwef";
    act(() => {
      fireEvent.change(input, { target: { value: badQuery } });
      fireEvent.click(searchBtn);
    });
    const noCardsNote = await screen.findByText("No cards");
    expect(noCardsNote).toBeInTheDocument();
  });
  it("should render the relevant card data", async () => {
    render(<App />);
    const searchBtn = await screen.findByTestId("search");
    const input = await screen.findByTestId("input");
    const Query = "Albatross";
    act(() => {
      fireEvent.change(input, { target: { value: Query } });
      fireEvent.click(searchBtn);
    });
    const title = await screen.findByText("Abalone");

    expect(title).toBeTruthy();
    const firstCard = 1;
    const list = await screen.findAllByTestId("card-text-list");
    const item = list[firstCard];
    expect(item.textContent).toContain("Canine");
    expect(item.textContent).toContain("Earth Animal");
    expect(item.textContent).toContain("Feline");
    expect(item.textContent).toContain("Earth Insect");
    // expect(canine ).toBeInTheDocument();
    // expect(feline ).toBeInTheDocument();
    //  const response = await fetch("https://stapi.co/api/v1/rest/animal/search/?&name=Albatross", {
    //   method: "POST",
    // });
    // const data = await response.json();
    // console.log("Response data:", data);
    // Добавьте утверждения, если необходимо
  });
  it("should render detail component on click", async () => {
    render(<App />);
    const card = await screen.findAllByTestId("card-item");
    const firstCard = 0;
    act(() => {
      fireEvent.click(card[firstCard]);
    });
    const detailCard = await screen.findByTestId("details");

    expect(detailCard).toBeInTheDocument();


  });
  it("should call fetch on click of the card", async () => {
    render(<App />);

    const searchBtn = await screen.findByTestId("search");
    const input = await screen.findByTestId("input");
    const Query = "Albatross";

    act(() => {
      fireEvent.change(input, { target: { value: Query } });
      fireEvent.click(searchBtn);
    });

    const card = await screen.findAllByTestId("card-item");
    const fetchSpy = vi.spyOn(global, "fetch");
    act(() => {
      fireEvent.click(card[0]);
    });

    expect(fetchSpy).toHaveBeenCalled();
    fetchSpy.mockRestore();
  });
});
