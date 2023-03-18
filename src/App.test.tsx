import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { container } from "tsyringe";

const context = describe;

test("App", () => {
  render(<App />);
});

describe("App", () => {
  beforeEach(() => {
    container.clearInstances();
  });

  context("when press increase button once", () => {
    it("counte", () => {
      render(<App />);

      fireEvent.click(screen.getByText("Increase"));

      const elements = screen.getAllByText("Count: 1");

      expect(elements).toHaveLength(2);
    });
  });

  context("when press increase button twice", () => {
    it("counte", () => {
      render(<App />);

      fireEvent.click(screen.getByText("Increase"));
      fireEvent.click(screen.getByText("Increase"));

      const elements = screen.getAllByText("Count: 2");

      expect(elements).toHaveLength(2);
    });
  });
});
