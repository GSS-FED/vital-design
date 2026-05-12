export const list = Array.from(Array(50)).map((_, index) => {
  return {
    id: index,
    value: `option ${index + 1}`,
    displayName: `option ${index + 1}`,
  };
});
