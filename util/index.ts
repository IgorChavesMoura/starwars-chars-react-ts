const isColor = strColor => {
  const s = new Option().style;
  s.color = strColor;
  return s.color !== '';
};

export { isColor };
