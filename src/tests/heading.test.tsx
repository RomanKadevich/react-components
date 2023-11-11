import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "../components/header";
import { MemoryRouter } from "react-router-dom";
describe("App", () => {
  it("Renders Animals", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("heading", {
        // level:1
      }),
    ).toHaveTextContent("Animal");
  });
});
