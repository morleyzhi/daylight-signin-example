export const px = (pixels: number) => {
  const rems = pixels / 16; // 16px to 1rem;
  return `${rems}rem`;
};

export const pxValue = (pixels: number) => {
  return pixels / 16;
};
