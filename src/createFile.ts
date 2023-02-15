export function generateBufferOfNumbers(length = 1000) {
  return Array.from({ length }, () => Math.floor(Math.random() * length)).join(
    " "
  );
}
