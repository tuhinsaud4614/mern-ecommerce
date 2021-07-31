export function uniqueArray<T>(prev: T[], value: T) {
  return Array.from<T>(new Set<T>([...prev, value]));
}

export function uniqueArrayOfObject<T extends object, K extends keyof T>(
  prev: T[],
  value: T,
  key: K
): T[] {
  const x = prev.findIndex((el) => el[key] === value[key]);
  if (x >= 0) {
    return prev;
  }
  return [...prev, value];
}

export const range = (start: number, end: number): number[] => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};
