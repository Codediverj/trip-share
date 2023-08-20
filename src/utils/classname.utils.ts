export const cx = (...arg: string[]): string => {
  return [...arg].filter(Boolean).join(" ");
};
