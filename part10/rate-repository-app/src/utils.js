const format = (n) => {
  format
  // eslint-disable-next-line no-undef
  const formatter = new Intl.NumberFormat('en-GB', {
    notation: "compact",
    compactDisplay: "short"
  });

  return formatter.format(n);
}

export { format };