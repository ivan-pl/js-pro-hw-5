import { join } from "node:path";

import { createFile } from "./utils/createFile.js";
import divideToSortedFiles from "./utils/divideToSortedFiles.js";
import mergeSortChunks from "./utils/mergeSortChunks.js";
import clearChunks from "./utils/clearChunks.js";

const DATA_FOLDER = "data";
const UNSORTED_DATA = join(DATA_FOLDER, "unsorted.txt");
const SORTED_DATA = join(DATA_FOLDER, "sorted.txt");
const CHUNK_SIZE = 4 * 1024 * 1024; // Bytes

createFile(UNSORTED_DATA, 100);

const chunkPaths = await divideToSortedFiles(
  UNSORTED_DATA,
  DATA_FOLDER,
  CHUNK_SIZE
);

await mergeSortChunks(chunkPaths, SORTED_DATA);

clearChunks(DATA_FOLDER);
