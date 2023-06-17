export function filterInPlace(array, condition) {
  let i = 0,
    j = 0;

  while (i < array.length) {
    const val = array[i];
    if (condition(val, i, array)) array[j++] = val;
    i++;
  }
  array.length = j;
  return array;
}
