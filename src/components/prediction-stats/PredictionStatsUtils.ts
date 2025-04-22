
export function shuffle<T>(array: T[]): T[] {
  let a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const wordCloudColors = [
  "#ea384c",
  "#D946EF",
  "#FFDEE2",
  "#FB7185",
  "#f472b6",
  "#e879f9",
  "#fda4af",
  "#be185d",
  "#f43f5e"
];

export function getFontSize(idx: number, min: number = 1.1, max: number = 2.1) {
  return `${min + (max - min) * (0.3 + Math.random() * 0.7)}rem`;
}
