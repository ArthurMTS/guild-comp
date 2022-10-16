export const mousePosition = (x: number, y: number) => {
  const pageWidth = window.innerWidth;
  const pageHeight = window.innerHeight;
  let left, right, top, bottom;

  left = x;
  top = y;

  if (left + 250 >= pageWidth - 20) {
    right = pageWidth - left + 20;
    left = undefined;
  }

  if (top + 300 >= pageHeight) {
    bottom = pageHeight - top + 20;
    top = undefined;
  }

  return {
    left,
    right,
    top,
    bottom,
  };
};
