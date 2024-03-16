<template>
  <div class="flex flex-col justify-between h-full">
    <div class="flex md:flex-row gap-4 flex-col">
      <PuzzleGrid @clicked="clickedCell" :edit-mode="mode !== 'input'" class="p-2" :key="clearKey" v-if="pdata.puzzle">
      </PuzzleGrid>
      <div class="bg-red-100">
        <div class="flex md:flex-col items-center justify-center md:justify-normal md:items-stretch">
          <CreateModeButton @click="clearBoard" class="bg-red-300 md:mb-10">clear
          </CreateModeButton>
          <CreateModeButton v-for="m in modes" :key="m" :is-active="mode === m" @click="setMode(m)">{{ m }}
          </CreateModeButton>
          <CreateModeButton v-if="false" @click="resizeBoard(1)" class="bg-red-300 mt-10 border-b">+
          </CreateModeButton>
          <CreateModeButton v-if="false" @click="resizeBoard(-1)" class="bg-red-300 mb-10 text-xl">-
          </CreateModeButton>
          <CreateModeButton class="md:mt-10" @click="createPuzzle">create</CreateModeButton>
        </div>
      </div>
      <div class="max-w-[300px] break-words">{{}}</div>
    </div>
    {{ current }}
    <KeyboardGrid></KeyboardGrid>
  </div>
</template>

<script setup>
import { computed, onMounted, provide, reactive, ref, watch } from "vue";
import { playPuzzleSymbol } from "@/injectionSymbols";
import { newPuzzle } from "@/helpers";
import KeyboardGrid from "@/components/KeyboardGrid.vue";
import CreateModeButton from "@/components/buttons/CreateModeButton.vue";
import PuzzleGrid from "@/components/PuzzleGrid.vue";

const current = ref("");
const pdata = reactive({});
const clearKey = ref(Symbol());

const modes = reactive(["input", "dark", "arrow", "dash", "divider"]);
const mode = ref("input");

const puzzleSize = reactive({ x: 10, y: 9 });

onMounted(() => {
  pdata.puzzle = newPuzzle(puzzleSize);
  const { gridDimensions } = pdata.puzzle;
  console.log(gridDimensions);
  puzzleSize.x = gridDimensions[0];
  puzzleSize.y = gridDimensions[1];
  //console.log(pdata.puzzle);
});

function resizeBoard(incr) {
  if (incr > 0 && puzzleSize.x < 10 && puzzleSize.y < 9) {
    puzzleSize.x = puzzleSize.x < 10 ? puzzleSize.x + 1 : puzzleSize.x;
    puzzleSize.y = puzzleSize.y < 9 ? puzzleSize.y + 1 : puzzleSize.y;
  } else if (incr < 0 && puzzleSize.x > 6 && puzzleSize.y > 5) {
    puzzleSize.x = puzzleSize.x > 6 ? puzzleSize.x - 1 : puzzleSize.x;
    puzzleSize.y = puzzleSize.y > 5 ? puzzleSize.y - 1 : puzzleSize.y;
  }
}

function setMode(m) {
  mode.value = m;

  //clearKey.value = Symbol();
}

const actions = {
  [modes[0]]: () => {
    console.log("toggleInput");
  },
  [modes[1]]: toggleDark,
  [modes[2]]: toggleArrow,
  [modes[3]]: toggleDash,
  [modes[4]]: toggleDivider,
};

const cellState = computed(() => {
  let str = pdata.puzzle.state.split("");
  return str[current.value];
});

function toggleDivider() {
  console.log("toggleDivider");
  const c = current.value;
  let str = pdata.puzzle.state.split("");
  let newVal = str[c] === "0" ? "1" : str[c];
  str[c] = String((newVal % 3) + 1);

  console.log("c", str[c]);
  pdata.puzzle.state = str.join("");
}

function toggleDash() {
  console.log("toggleDash");
  const c = current.value;
  const r = pdata.puzzle.dashes.r;
  const d = pdata.puzzle.dashes.d;
  const ri = r.indexOf(c);
  const di = d.indexOf(c);

  if (ri > -1 && di > -1) {
    r.splice(ri, 1);
    d.splice(di, 1);
  } else if (ri > -1) {
    r.splice(ri, 1);
    d.push(c);
  } else {
    r.push(c);
  }
}

function toggleArrow() {
  console.log("toggleArrow");
  let idx;
  const c = current.value;
  const d = [...pdata.puzzle.arrows.d];
  const r = [...pdata.puzzle.arrows.r];

  if ((idx = d.indexOf(c)) > -1) {
    d.splice(idx, 1);
    r.push(c);
  } else if ((idx = r.indexOf(c)) > -1) {
    r.splice(idx, 1);
  } else {
    d.push(c);
  }
  const arr = { d: d, r: r };
  pdata.puzzle.arrows = arr;
}

function clearArrow() {
  const down = [...pdata.puzzle.arrows.d];
  const right = [...pdata.puzzle.arrows.r];
  const c = current.value;
  let idx;
  if ((idx = down.indexOf(c)) > -1) {
    down.splice(idx, 1);
  } else if ((idx = right.indexOf(c)) > -1) {
    right.splice(idx, 1);
  }
  pdata.puzzle.arrows = { d: down, r: right };
}

function clearDash() {
  console.log("clearDash");
  const c = current.value;
  const r = [...pdata.puzzle.dashes.r];
  const d = [...pdata.puzzle.dashes.d];
  const ri = r.indexOf(c);
  const di = d.indexOf(c);

  if (di > -1) {
    d.splice(di, 1);
  }
  if (ri > -1) {
    r.splice(ri, 1);
  }
  pdata.puzzle.dashes = { d: d, r: r };
}

function toggleDark() {
  console.log("dark");
  const c = current.value;
  let str = pdata.puzzle.state.split("");
  const state = str[c];

  if (state !== "0") {
    clearCurrentCell();

    str[c] = "0";
  } else {
    str[c] = "1";
  }

  console.log("c", str[c]);
  pdata.puzzle.state = str.join("");
}

function clearCurrentCell() {
  clearArrow();
  clearDash();
  let resp = pdata.puzzle.response.split("");
  resp[current.value] = "_";
  pdata.puzzle.response = resp.join("");

  //let resp  pdata.puzzle.response
}

function clearBoard(force = false) {
  if (confirm("Återställer spelplan?")) {
    puzzleSize.x = 10;
    puzzleSize.y = 9;
    pdata.puzzle = newPuzzle({ forceNew: true, ...puzzleSize });
    clearKey.value = Symbol();
    // current.value = -1;
  }
}

function clickedCell(cell) {
  current.value = cell;

  if (cell > -1) {
    actions[mode.value]();
  }

  //if (mode.value !== "input") clearKey.value = Symbol();
}

async function createPuzzle() {
  console.log(pdata.puzzle);
  const result = await fetch("/api/v1/play/puzzle/create", {
    method: "POST",
    body: JSON.stringify(pdata.puzzle),
  });
}

watch(mode, (mod) => {
  console.log(mod);
});
//watch(
//  pdata,
//  () => {
//    console.log("EDIINGNFSADJF");
//  },
//  { deep: true }
//);
provide(playPuzzleSymbol, pdata);
</script>

<style scoped></style>
