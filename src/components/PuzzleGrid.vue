<template>
  <div class="max-w-gamewidth w-full mx-auto">
    <div
      class="grid gap-x-px gap-y-px mx-auto box-bordermax-h-[449px] w-full border border-slate-600 rounded-sm overflow-hidden bg-slate-600 shadow-lg select-none"
      :class="{
        'grid-rows-9 grid-cols-10 aspect-[10/9]': dimension.x === 10,
        'grid-rows-8 grid-cols-9 aspect-[9/8]': dimension.x === 9,
        'grid-rows-7 grid-cols-8 aspect-[8/7]': dimension.x === 8,
        'grid-rows-6 grid-cols-7 aspect-[7/6]': dimension.x === 7,
        'grid-rows-5 grid-cols-6 aspect-[6/5]': dimension.x === 6,
      }">
      <puzzle-grid-item v-for="([x, y, data], idx) in grid.grid" :key="idx" @click="selectCell(`${x}-${y}`, idx, true)"
        :class="[
        highlighted.includes(`${x}-${y}`) ? '!bg-gray-300' : '',
        selected === `${x}-${y}` ? '!bg-gray-400' : '',
      ]" :cell="data">
      </puzzle-grid-item>
    </div>

    <!--p>Selected cell: {{ selectedCellCoordinates || "none" }}</p>
    <p>Selected cell index: {{ selectedCellGridIndex || "none" }}</p>
    <p>Last key press: [{{ lastKeyPress }}]</p-->
  </div>
</template>

<script setup>
import {
  reactive,
  inject,
  onBeforeMount,
  ref,
  computed,
  watch,
  onBeforeUnmount,
  toRefs,
} from "vue";
import PuzzleGridItem from "./PuzzleGridItem.vue";
import { playPuzzleSymbol } from "@/injectionSymbols";
import {
  addKeyPressObserver,
  removeKeyPressObserver,
} from "@/services/inputservice";
import { Operation } from "@/helpers";
import { savePuzzle } from "@/storage";

const props = defineProps(["editMode"]);
const { editMode } = toRefs(props);
const emit = defineEmits(["selectCell", "clicked"]);
const { puzzle } = inject(playPuzzleSymbol);
const [dimx, dimy] = puzzle.gridDimensions || [10, 9];
const dimension = reactive({ x: dimx, y: dimy });

const lastKeyPress = ref("");
const grid = reactive({ grid: [], letters: {} });
const selected = ref("");
const highlighted = reactive([]);

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

const cellResponse = computed({
  get() {
    return puzzle.response.split("");
  },
  set(val) {
    const idx = selectedCellGridIndex.value;
    const arr = puzzle.response.split("");
    arr[idx] = val;
    puzzle.response = arr.join("");
  },
});

const backDirection = computed(() => {
  return orientation.value === "v" ? DIRECTION.UP : DIRECTION.LEFT;
});

function notify(key) {
  lastKeyPress.value = key;
  if (!selected.value) return;
  if (key.match(/^[a-zåäö]$/)) {
    // grid.letters[selected.value] = key;
    //grid.grid[selectedCellGridIndex.value][2].letter = key;
    cellResponse.value = key;
    moveSelection(DIRECTION[orientation.value]);
  } else if (key in DIRECTION) moveSelection(DIRECTION[key]);
  else if (key === " ") changeOrientation(true);
  else if (key === "backspace") {
    if (backspacePressed()) {
      moveSelection(backDirection.value, false);
      backspacePressed(true);
    } else {
      backspacePressed(true);
    }
    update("backspace");
  }
}

function moveSelection(dir, updateBoard = true) {
  let newId;
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
        newId = `${xx}-${yy}`;
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
        newId = `${xx}-${yy}`;
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
        newId = `${xx}-${yy}`;
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
        newId = `${xx}-${yy}`;
        break;
      }
      break;
    }
  }
  if (newId) selectCell(newId);
  if (updateBoard) update("moveSelection");
}

function backspacePressed() {
  const i = selectedCellGridIndex.value;
  if (i < 0) return false;
  const data = grid.grid[i][2];
  if (data.letter !== "_") {
    cellResponse.value = "_";
    return false;
  }
  return true;
}

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

function nextCellIndex(current, operation = Operation.add) {
  const [x, y] = current;
  if (orientation.value === "h") {
    const val = operation(x, 1);
    if (val >= dimension.x || val < 0) return -1;
    return y * dimension.x + operation(x, 1);
  }
  const val = operation(y, 1);
  if (val >= dimension.y || val < 0) return -1;
  return operation(y, 1) * dimension.x + x;
}

function hightlightCells() {
  highlighted.length = 0;
  if (!selected.value) return;
  else if (puzzle?.edit) return;
  const maxLoops = dimension.x * dimension.y; //Prevent infinite loop

  const ops = [Operation.add, Operation.sub];
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

function unSelectAll() {
  console.log("unselect all");
  highlighted.length = 0;

}

function changeOrientation(updateBoard = false) {
  orientation.value = orientation.value === "h" ? "v" : "h";
  console.log("change dir: ", orientation.value);
  if (updateBoard) update("changeOrientation");
}

function selectCell(cellId = selected.value, index = -1, updateBoard = false) {
  if (index > -1) emit("clicked", index);

  if (index > -1 && grid.grid[index][2].state !== 1) return false;

  if (selected.value === cellId) changeOrientation();
  selected.value = cellId;
  highlighted.length = 0;
  if (updateBoard) update("selectCell");
  return true;
}

function parseGrid() {
  const g = [];
  for (let i = 0; i < dimension.y; i++) {
    for (let j = 0; j < dimension.x; j++) {
      const index = i * dimension.x + j;
      g.push([j, i, _get_cell_data(index)]);
    }
  }
  grid.grid = [...g];
}

const wordStars = computed(() => {
  if (puzzle.wordStarts?.length > 0) {
    return [...puzzle.wordStarts].sort((a, b) => {
      if (a < b) return -1;
      else if (a > b) return 1;
      return 0;
    });
  }
  return [];
});
const arrows = computed(() => {
  if (puzzle.arrows) return { ...puzzle.arrows };
  return {};
});
const dashes = computed(() => {
  if (puzzle.dashes) return { ...puzzle.dashes };
  return { d: [], r: [] };
});

function _get_cell_data(i) {
  //const data = { state: Number(puzzle.state[y][x]) };
  const data = { state: Number(puzzle.state[i]) };
  if (data.state === 0) return data;
  //const w = `${x}-${y}`;
  let idx;

  if ((idx = wordStars.value.indexOf(i)) > -1) {
    data.start = idx + 1;
  }
  ["d", "r"].forEach((dir) => {
    if ((idx = arrows.value[dir].indexOf(i)) > -1) {
      if (!("arrow" in data)) data.arrow = [];
      data.arrow.push(dir);
    }
    if ((idx = dashes.value[dir].indexOf(i)) > -1) {
      if (!("dash" in data)) data.dash = [];
      data.dash.push(dir);
    }
  });
  data.letter = puzzle.response[i];
  return data;
}

function update(source = "update") {

  if (editMode.value) {
    unSelectAll()
    return;
  };
  hightlightCells();
  if (selected.value.length < 1) {
    return;
  }
  emit("selectCell", selectedCellGridIndex.value);
  drawGrid(source);
}

watch([selected, orientation, cellResponse], () => { }, {
  onTrigger(e) {
    //console.log("sel", e);
  },
});

const puzzleUnwatch = watch(
  () => [puzzle.arrows, puzzle.dashes, puzzle.state, editMode.value],
  () => {
    if (editMode.value) {
      selected.value = "";
      unSelectAll();
      drawGrid("puzzlewatch");
    } else hightlightCells();
  },
  {
    onTrigger(e) {
      //console.log(e);
    },
    deep: true,
  }
);
if (editMode.value === undefined) {
  puzzleUnwatch();
}

function parseResponse() {
  let i = 0;
  let resp = puzzle.response;

  for (const [k, [x, y, d]] of Object.entries(grid.grid)) {
    d.letter = resp[k];
  }
}

//function reDraw() {
//  drawGrid();
//}
function drawGrid(caller = "") {
  console.log(`drawGrid(${caller})`);
  parseGrid();
  parseResponse();
  try {
    savePuzzle({ ...puzzle }, editMode.value !== undefined);
  } catch (er) {
    console.log("draw error", er);
  }
}

onBeforeMount(() => {
  addKeyPressObserver(notify);
  drawGrid("onBeforeMount");
});
onBeforeUnmount(() => {
  removeKeyPressObserver(notify);
});
</script>

<style scoped></style>
