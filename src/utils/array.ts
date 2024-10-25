export function createArrayOfSize<T = undefined>(n: number, item?: T) {
  return new Array(n).fill(item);
}
