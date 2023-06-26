import { deletePuzzle, getPuzzle } from "@/storage";

const CREATOR = "creator";
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

function getLocalPuzzle() {
  let puzzle = getPuzzle(CREATOR);
  puzzle = JSON.parse(puzzle);
  delete puzzle?.timestamp;
  return puzzle;
}

export function newPuzzle(forceNew = false) {
  let p;
  if (!forceNew) p = getLocalPuzzle();
  else deletePuzzle(CREATOR);

  const rows = 9,
    cols = 10;
  const grid = "1".repeat(rows * cols);
  const response = "_".repeat(rows * cols);
  console.log(p);

  const puzzle = {
    id: CREATOR,
    state: p?.state || grid,
    gridDimensions: p?.gridDimensions || [cols, rows],
    arrows: p?.arrows || { d: [], r: [] },
    dashes: p?.dashes || { d: [], r: [] },
    wordStarts: p?.wordStarts || [],
    response: p?.response || response,
  };

  console.log("creator", puzzle);
  return puzzle;
}
