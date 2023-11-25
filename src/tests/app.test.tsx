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
import Pagination from "../components/Pagination";
import { MyErrorBoundary } from "../components/errorBoundary";
import NotFound from "@/pages/404";
import { mockTest } from "./moks";
import List from "@/components/List";
import Header from "@/components/header";

describe("App", () => {
  const useRouter = vi.spyOn(require("next/router"), "useRouter");

  useRouter.mockImplementation(() => ({
    route: "/",
    pathname: "",
    query: "",
    asPath: "",
    push: vi.fn(),
    events: {
      on: vi.fn(),
      off: vi.fn(),
    },
    beforePopState: vi.fn(() => null),
    prefetch: vi.fn(() => null),
  }));
  beforeEach(() => {
    vi.clearAllMocks();
  });
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should check correct list item", async () => {
    render(<List animals={mockTest} />);
    const list = await screen.findAllByTestId("card-item");
    expect(list).toHaveLength(12);
  });

  it("should show no 404", async () => {
    const notFound = render(<NotFound />);
    expect(notFound).toBeTruthy();
  });
  it("should show pagination", async () => {
    const pagination = render(<Pagination pageIndex={0} pageNumber={0} />);
    expect(pagination).toBeTruthy();
  });
  it("should show header", async () => {
    const header = render(<Header />);
    expect(header).toBeTruthy();
  });
  it("should show header", async () => {
    const ErrorComponent = () => {
      throw new Error("Simulated error");
    };
    const errorBoundary = render(
      <MyErrorBoundary>
        <ErrorComponent />
      </MyErrorBoundary>,
    );
    expect(errorBoundary).toBeTruthy();
  });

  it("should render the relevant card data", async () => {
    const startPathName = window.location.search;
    console.log(startPathName);
    render(<Header />);

    const searchBtn = await screen.findByTestId("search");
    const input = await screen.findByTestId("input");
    const Query = "Albatross";
    act(() => {
      fireEvent.change(input, { target: { value: Query } });
      fireEvent.click(searchBtn);
    });
    const afterPathName = window.location.search;

    expect(startPathName).toEqual(afterPathName);
  });

  it("should render the relevant card data", async () => {
    const startPathName = window.location.search;
    render(<Header />);

    const searchBtn = await screen.findByTestId("search");
    const input = await screen.findByTestId("input");
    const Query = "Albatross";
    act(() => {
      fireEvent.change(input, { target: { value: Query } });
      fireEvent.click(searchBtn);
    });
    const afterPathName = window.location.search;

    expect(startPathName).toEqual(afterPathName);
  });
  it("should click pagination", async () => {
    render(<Pagination pageIndex={0} pageNumber={0} />);

    const next = await screen.findByTestId("next");

    act(() => {
      fireEvent.click(next);
    });
    expect(next).toBeTruthy();
  });
  it("should click cards", async () => {
    render(<List animals={mockTest} />);

    const card = await screen.findAllByTestId("card-item");

    act(() => {
      fireEvent.click(card[0]);
    });
    expect(card[0]).toBeTruthy();
  });
});
