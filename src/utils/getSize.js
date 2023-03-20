import { statSync } from "node:fs";

export default function getSize(path) {
  const stats = statSync(path);
  return stats.size / (1024 * 1024);
}
