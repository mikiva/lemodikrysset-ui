<template>
  <div>
    <div
      class="grid grid-rows-9 grid-cols-10 mx-auto border-gray-800 box-border border-r border-b max-w-[499px] max-h-[449px] w-full"
    >
      <div v-for="([x, y, data], idx) in grid.grid" :key="idx">
        <puzzle-grid-item
          @click="selectCell(`${x}-${y}`)"
          :class="[
            x < dimension.x ? 'border-t' : '',
            y < dimension.y ? 'border-l' : '',
            highlighted.includes(`${x}-${y}`) ? 'bg-gray-300' : '',
            selected === `${x}-${y}` ? 'bg-gray-400' : '',
          ]"
          :cell="data"
        >
        </puzzle-grid-item>
      </div>
    </div>

    <p>Selected cell: {{ selected || "none" }}</p>
    <p>Direction: {{ orientation }}</p>
    <p>Last key press: [{{ lastKeyPress }}]</p>
  </div>
</template>

<script setup>
import {
  reactive,
  inject,
  onBeforeMount,
  provide,
  ref,
  computed,
  watch,
  onBeforeUnmount,
} from "vue";
import PuzzleGridItem from "./PuzzleGridItem.vue";
import {
  addKeyPressObserverSymbol,
  playPuzzleSymbol,
} from "@/injectionSymbols";
import {
  addKeyPressObserver,
  removeKeyPressObserver,
} from "@/services/inputservice";

const { puzzle } = inject(playPuzzleSymbol);
const dimension = reactive({ x: 10, y: 9 });

const lastKeyPress = ref("");
const grid = reactive({ grid: [], letters: {} });
const wordStarts = {};

const addObserver = inject(addKeyPressObserverSymbol, (func) => {
  func();
});

const selected = ref("");
const highlighted = reactive([]);

const ORIENTATION = {
  VERTICAL: "v",
  HORIZONTAL: "h",
};
const orientation = ref("h");

const DIRECTION = {
  UP: "up",
  arrowup: "up",
  RIGHT: "right",
  arrowright: "right",
  DOWN: "down",
  arrowdown: "down",
  LEFT: "left",
  arrowleft: "left",
  h: "right",
  v: "down",
};

function notify(key) {
  lastKeyPress.value = key;
  if (!selected.value) return;
  if (key.match(/^[a-zåäö]$/)) {
    // grid.letters[selected.value] = key;
    grid.grid[selectedCellGridIndex.value][2].letter = key;
    moveSelection(DIRECTION[orientation.value]);
  } else if (key in DIRECTION) moveSelection(DIRECTION[key]);
  else if (key === " ") changeOrientation();
  else if (key === "backspace") backspacePressed();
}

function moveSelection(dir) {
  switch (dir) {
    case "up": {
      let i = selectedCellGridIndex.value - dimension.x;
      while (i > -dimension.x) {
        if (i < 0) {
          i = i + dimension.y * dimension.x - 1;
          continue;
        }
        const [xx, yy, data] = grid.grid[i];
        if (data.state !== 1) {
          i = i - dimension.x;
          continue;
        }
        selectCell(`${xx}-${yy}`);
        break;
      }
      break;
    }
    case "right": {
      let i = selectedCellGridIndex.value + 1;
      while (i < grid.grid.length) {
        if (i >= dimension.x * dimension.y) break;
        const [xx, yy, data] = grid.grid[i];
        if (data.state !== 1) {
          i++;
          continue;
        }
        selectCell(`${xx}-${yy}`);
        break;
      }
      break;
    }
    case "down": {
      let i = selectedCellGridIndex.value + dimension.x;
      while (i < grid.grid.length + (dimension.x - 1)) {
        if (i >= grid.grid.length) {
          i = i - grid.grid.length + 1;
          continue;
        }
        const [xx, yy, data] = grid.grid[i];
        if (data.state !== 1) {
          i = i + dimension.x;
          continue;
        }
        selectCell(`${xx}-${yy}`);
        break;
      }
      break;
    }
    case "left": {
      let i = selectedCellGridIndex.value - 1;
      while (i > -1) {
        const [xx, yy, data] = grid.grid[i];
        if (data.state !== 1) {
          i--;
          continue;
        }
        selectCell(`${xx}-${yy}`);
        break;
      }
      break;
    }
  }
}

function backspacePressed(stop = false) {
  let dir;
  if (orientation.value === "v") dir = DIRECTION.UP;
  else dir = DIRECTION.LEFT;
  const i = selectedCellGridIndex.value;
  if (i < 0) return;
  const data = grid.grid[i][2];
  if (data.letter) {
    delete data.letter;
  } else if (!stop) {
    moveSelection(dir);
    backspacePressed(true);
  }
}

function parseWordStarts() {
  if (puzzle.wordStarts === 0) return;
  let w = 0;
  puzzle.wordStarts.forEach((s) => {
    wordStarts[`${s.x}-${s.y}`] = ++w;
  });
}

const arrows = {};

const selectedCellCoordinates = computed(() => {
  const [x, y] = selected.value.split("-");
  return [Number(x), Number(y)];
});
const selectedCellGridIndex = computed(() => {
  const [x, y] = selectedCellCoordinates.value;
  const i = y * dimension.x + x;
  if (isNaN(i)) return -1;
  return i;
});

function nextCellIndex(current, operation = "+") {
  const [x, y] = current;
  if (orientation.value === "h") {
    const valueExpression = `x ${operation} 1`;
    const val = eval(valueExpression);
    if (val >= dimension.x || val < 0) return -1;
    const expression = `y * ${dimension.x} + (x ${operation} 1 )`; //.format(dimension.x, operation);
    const newIndex = eval(expression);
    return newIndex;
  }
  const valueExpression = `y ${operation} 1`;
  const val = eval(valueExpression);
  if (val >= dimension.y || val < 0) return -1;
  const expression = `(y ${operation} 1 ) * ${dimension.x} + x`;
  return eval(expression);
}

function hightlightCells() {
  highlighted.length = 0;
  if (!selected.value) return;
  const maxLoops = dimension.x * dimension.y; //Prevent infinite loop

  const ops = ["+", "-"];
  ops.forEach((op) => {
    let currLoop = 0;
    let [x, y] = selectedCellCoordinates.value;
    let index = nextCellIndex([x, y], op);

    while (index > -1) {
      const cell = grid.grid[index];
      currLoop++;
      if (currLoop >= maxLoops) break;
      const xx = cell[0];
      const yy = cell[1];
      if (cell[2].state !== 1) break;
      highlighted.push(`${xx}-${yy}`);
      index = nextCellIndex([xx, yy], op);
    }
  });

  //dir === "h" ? highlightHorizontal() : highlightVertical();
}

function changeOrientation() {
  orientation.value = orientation.value === "h" ? "v" : "h";
  console.log("change dir: ", orientation.value);
}

function selectCell(cellId) {
  if (selected.value === cellId) changeOrientation();
  selected.value = cellId;
  highlighted.length = 0;
}

function parseArrows() {
  puzzle.arrows.forEach((s) => {
    arrows[`${s.x}-${s.y}`] = s.direction;
  });
}

function parseGrid() {
  const g = [];
  for (let i = 0; i < dimension.y; i++) {
    for (let j = 0; j < dimension.x; j++) {
      g.push([j, i, _get_cell_data(j, i)]);
    }
  }
  grid.grid = g;
}

function _get_cell_data(x, y) {
  const data = { state: Number(puzzle.state[y][x]) };
  if (data.state === 0) return data;
  const w = `${x}-${y}`;
  if (w in wordStarts) data.start = wordStarts[w];
  if (w in arrows) data.arrow = arrows[w];

  return data;
}

watch([selected, orientation], () => {
  hightlightCells();
});

function parseResponse() {
  let i = 0;
  grid.grid.forEach(([x, y, d]) => {
    if (d.state !== 1) return;
    if (puzzle.response[i] === "_") i++;
    else d.letter = puzzle.response[i++];
  });
}

onBeforeMount(() => {
  addKeyPressObserver(notify);
  parseWordStarts();
  parseArrows();
  parseGrid();
  if (puzzle.response) parseResponse();
});
onBeforeUnmount(() => {
  removeKeyPressObserver(notify);
});

provide("letters", grid.letters);
</script>

<style scoped></style>
