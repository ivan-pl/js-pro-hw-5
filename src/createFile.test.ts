import { generateBufferOfNumbers } from "./createFile";

describe("generateBufferOfNumbers()", () => {
  it("returns string of numbers with length 1000", () => {
    const array = generateBufferOfNumbers().split(" ");
    expect(array.length).toBe(1000);
    expect(array.every((_) => !isNaN(parseInt(_)))).toBeTruthy();
  });

  it("returns string of numbers with length 5", () => {
    const array = generateBufferOfNumbers(5).split(" ");
    expect(array.length).toBe(5);
    expect(array.every((_) => !isNaN(parseInt(_)))).toBeTruthy();
  });
});
