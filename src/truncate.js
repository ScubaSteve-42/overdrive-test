export const truncate = (str, max) =>
  str.length <= max ? str : max <= 0 ? '' : str.slice(0, max - 1) + '…';
