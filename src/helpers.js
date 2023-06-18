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

export const Operation = {
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
  mul: (a, b) => a * b,
  div: (a, b) => a / b,
};

export function emptyPuzzle() {
  let nbrRows = 9;
  const grid = [];
  for (let i = 0; i < nbrRows; i++) {
    grid.push(Array.from({ length: 10 }, () => 1));
  }
  return {
    state: grid,
  };
}
