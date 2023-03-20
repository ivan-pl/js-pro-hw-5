import {
  unlinkSync,
  existsSync,
  createReadStream,
  appendFileSync,
} from "node:fs";

export default async function mergeSortChunks(chunkPaths, outputPath) {
  if (existsSync(outputPath)) {
    unlinkSync(outputPath);
  }

  const iterators = chunkPaths.map(chunkIterator);
  const chunkArrays = await Promise.all(
    iterators.map((iter) => iter.next().then((_) => _.value))
  );
  let arrayToWrite = [];

  while (chunkArrays.length > 0) {
    const nextValue = await popMax(chunkArrays, iterators); // eslint-disable-line no-await-in-loop
    arrayToWrite.push(nextValue);
    if (arrayToWrite.length > 10000) {
      appendFileSync(outputPath, arrayToWrite.join(" "));
      arrayToWrite = [];
    }
  }
  if (arrayToWrite.length > 0) {
    appendFileSync(outputPath, arrayToWrite.join(" "));
  }
}

async function* chunkIterator(path) {
  const readStream = createReadStream(path, { encoding: "utf8" });
  for await (const chunk of readStream) {
    yield chunk.split(" ").map((_) => +_);
  }
  readStream.close();
}

async function popMax(chunkArrays, iterators) {
  let minValInd = 0;
  for (let i = 0; i < chunkArrays.length; i++) {
    if (chunkArrays[i][0] < chunkArrays[minValInd][0]) {
      minValInd = i;
    }
  }

  const result = chunkArrays[minValInd].shift();

  if (chunkArrays[minValInd].length === 0) {
    const nextIter = await iterators[minValInd].next();
    if (nextIter.done) {
      chunkArrays.splice(minValInd, 1);
      iterators.splice(minValInd, 1);
    } else {
      chunkArrays[minValInd] = nextIter.value; // eslint-disable-line no-param-reassign
    }
  }

  return result;
}
