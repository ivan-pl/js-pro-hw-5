import { readdirSync, unlinkSync } from "node:fs";
import { join } from "node:path";

export default function clearChunks(path) {
  for (const file of readdirSync(path)) {
    if (file.startsWith("chunk_")) {
      unlinkSync(join(path, file));
    }
  }
}
