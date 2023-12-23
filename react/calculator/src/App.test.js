/* eslint-disable no-unused-vars */
/* eslint-disable testing-library/prefer-screen-queries */
import { render, fireEvent, getByRole } from "@testing-library/react";
import { CalculatorPage, VolumesPage } from "./pages";

// test cases for the calculator
describe("CalculatorPage", () => {
  test("should display 0 when the calculator is opened", () => {
    const { getByTestId } = render(<CalculatorPage />);
    const result = getByTestId("result");
    expect(result.textContent).toBe("0");
  });

  test("should display 1 when the 1 button is clicked", () => {
    const { getByRole, getByTestId } = render(<CalculatorPage />);
    fireEvent.click(getByRole("button", { name: "1" }));
    const result = getByTestId("result");
    expect(result.textContent).toBe("1");
  });

  const testCases = [
    {
      sequence: ["1", "+", "2", "="],
      result: "3",
    },
    {
      sequence: ["2", "*", "3", "="],
      result: "6",
    },
    {
      sequence: ["2", "/", "3", "="],
      result: "0",
    },
    {
      sequence: ["2", "-", "3", "="],
      result: "-1",
    },
    {
      sequence: ["2", "+", "3", "*", "4", "="],
      result: "20",
    },
    {
      sequence: ["2", "+", "3", "*", "4", "/", "2", "="],
      result: "10",
    },
    {
      sequence: ["2", "+", "3", "*", "4", "/", "2", "-", "1", "="],
      result: "9",
    },
    {
      sequence: ["2", "+", "3", "*", "4", "/", "2", "-", "1", "+", "2", "="],
      result: "11",
    },
    {
      sequence: [
        "2",
        "+",
        "3",
        "*",
        "4",
        "/",
        "2",
        "-",
        "1",
        "+",
        "2",
        "*",
        "3",
        "=",
      ],
      result: "33",
    },
  ];

  testCases.forEach(({ sequence, result }) => {
    test(`should display ${result} when ${sequence.join(
      " "
    )} are clicked`, () => {
      const { getByRole, getByTestId } = render(<CalculatorPage />);
      sequence.forEach((buttonText) => {
        fireEvent.click(getByRole("button", { name: buttonText }));
      });
      const resultHtml = getByTestId("result");
      expect(resultHtml.textContent).toBe(result);
    });
  });
});

// test cases for the volumes
describe("VolumesPage", () => {
  test("should show Cube with length 1 when calculator is opened", () => {
    const { getByTestId } = render(<VolumesPage />);
    const result = getByTestId("result");
    const selection = getByTestId("shape-selection");
    const length = getByTestId("dimension-length");
    expect(selection.value).toBe("Cube");
    expect(length.value).toBe("1");
    expect(result.textContent).toBe("1");
  });

  test("should calculate Cube volume for length 2", () => {
    const { getByTestId } = render(<VolumesPage />);
    const length = getByTestId("dimension-length");
    fireEvent.change(length, { target: { value: "2" } });
    const result = getByTestId("result");
    expect(result.textContent).toBe("8");
  });

  test("should calculate Cube volume for length 3", () => {
    const { getByTestId } = render(<VolumesPage />);
    const length = getByTestId("dimension-length");
    fireEvent.change(length, { target: { value: "3" } });
    const result = getByTestId("result");
    expect(result.textContent).toBe("27");
  });

  test("should show sphere with radius 1 when switching to Sphere", () => {
    const { getByTestId } = render(<VolumesPage />);
    const selection = getByTestId("shape-selection");
    fireEvent.change(selection, { target: { value: "Sphere" } });
    const result = getByTestId("result");
    const radius = getByTestId("dimension-radius");
    expect(radius.value).toBe("1");
    expect(result.textContent).toBe("4.18879");
  });

  const testCases = [
    {
      shape: "Cube",
      dimensions: { length: "1" },
      result: "1",
    },
    {
      shape: "Sphere",
      dimensions: { radius: "2" },
      result: "33.5103",
    },
  ];

  testCases.forEach(({ shape, dimensions, result }) => {
    test(`should calculate ${shape} volume for ${JSON.stringify(
      dimensions
    )}`, () => {
      const { getByTestId } = render(<VolumesPage />);
      const selection = getByTestId("shape-selection");
      fireEvent.change(selection, { target: { value: shape } });
      const dimensionsObject = Object.keys(dimensions);
      dimensionsObject.forEach((dimension) => {
        const input = getByTestId(`dimension-${dimension}`);
        fireEvent.change(input, {
          target: { value: dimensions[dimension] },
        });
      });
      const resultHtml = getByTestId("result");
      expect(resultHtml.textContent).toBe(result);
    });
  });
});
