export function average(data: number[]) {
  let total = 0;
  let count = 0;

  for (const d of data) {
    total += d;
    count += 1;
  }

  return total / count;
}
