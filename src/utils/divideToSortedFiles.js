import { createReadStream, writeFileSync } from "node:fs";
import { Buffer } from "node:buffer";
import { join } from "node:path";

import clearChunks from "./clearChunks.js";

export default async function divideToSortedFiles(
  inputPath,
  outputFolder,
  chunkSize
) {
  clearChunks(outputFolder);

  let currentBuffer = Buffer.from("");
  const chunkPaths = [];

  const readStream = createReadStream(inputPath);
  for await (const chunk of readStream) {
    if (currentBuffer.length >= chunkSize) {
      writeChunk(outputFolder, chunkPaths, currentBuffer);
      currentBuffer = Buffer.from("");
    }
    currentBuffer = Buffer.concat([currentBuffer, chunk]);
  }
  writeChunk(outputFolder, chunkPaths, currentBuffer);

  return chunkPaths;
}

function writeChunk(outputFolder, chunkPaths, chunk) {
  if (chunk.length === 0) {
    return;
  }
  const chunkPath = join(outputFolder, `chunk_${chunkPaths.length}.txt`);
  chunkPaths.push(chunkPath);
  writeFileSync(chunkPath, sortBufferData(chunk));
}

function sortBufferData(data) {
  return data
    .toString()
    .split(" ")
    .sort((a, b) => +a - +b)
    .join(" ");
}
