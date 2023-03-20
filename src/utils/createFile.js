import { appendFileSync, unlinkSync, existsSync } from "node:fs";
import getSize from "./getSize.js";

export function generateBufferOfNumbers(length = 1000) {
  return Array.from({ length }, () => Math.floor(Math.random() * length)).join(
    " "
  );
}

export async function createFile(path, size) {
  if (existsSync(path)) {
    unlinkSync(path);
  }
  let curSize = 0;
  while (curSize < size) {
    appendFileSync(path, generateBufferOfNumbers());
    curSize = getSize(path);
  }
}
