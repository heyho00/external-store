import { fireEvent, render, screen } from "@testing-library/react";
import { container } from "tsyringe";
import App from "./App";

const context = describe;

test("App", () => {
  render(<App />);
});

describe("App", () => {
  beforeEach(() => {
    // 각 테스트가 시작되기 전 초기화해줌. 독립적이어야 하기 때문에.
    container.clearInstances();
  });

  context("when press increase button once", () => {
    test("counter", () => {
      render(<App />);

      fireEvent.click(screen.getByText("Increase"));

      const elements = screen.getAllByText("Count 1");
      expect(elements).toHaveLength(2);
    });
  });

  context("when press increase button twice", () => {
    test("counter", () => {
      render(<App />);

      fireEvent.click(screen.getByText("Increase"));
      fireEvent.click(screen.getByText("Increase"));

      const elements = screen.getAllByText("Count 2");
      expect(elements).toHaveLength(2);
    });
  });
});
