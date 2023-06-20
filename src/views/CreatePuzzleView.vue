<template>
  <div class="flex flex-col justify-between h-full">
    <div class="relative flex gap-4 h-full">
      <PuzzleGrid
        @select-cell="selectCell"
        class="max-w-gamewidth w-full inline-block"
        ref="puzzleGrid"
      ></PuzzleGrid>
      <div class="bg-red-100">
        <div class="flex flex-col">
          <CreateModeButton
            v-for="m in modes"
            :key="m"
            :is-active="mode === m"
            @click="mode = m"
            >{{ m }}
          </CreateModeButton>
        </div>
      </div>
    </div>
    {{ current }}
    <KeyboardGrid></KeyboardGrid>
  </div>
</template>

<script setup>
import PuzzleGrid from "@/components/PuzzleGrid.vue";
import { provide, reactive, ref, watch } from "vue";
import { playPuzzleSymbol } from "@/injectionSymbols";
import { emptyPuzzle } from "@/helpers";
import KeyboardGrid from "@/components/KeyboardGrid.vue";
import CreateModeButton from "@/components/buttons/CreateModeButton.vue";

const current = ref("");
const pdata = reactive({});
pdata.puzzle = emptyPuzzle();
pdata.puzzle.edit = false;
pdata.puzzle.response = new Array(90 + 1).join("_");
console.log(pdata.puzzle.response);
const puzzleGrid = ref(null);

const modes = ["input", "dark", "arrow", "dash", "divider"];

const mode = ref("input");

const actions = {
  [modes[0]]: () => {},
  [modes[1]]: toggleDark,
  [modes[2]]: toggleArrow,
  [modes[3]]: toggleDash,
  [modes[4]]: toggleDivider,
};

function toggleDivider() {
  console.log("div");
}

function toggleDash() {
  console.log("dash");
}

function toggleArrow() {
  console.log("arrow");
}

function toggleDark() {
  console.log(pdata.puzzle.arrows);
  console.log("dark");
}

function selectCell(cell) {
  current.value = cell;
  actions[mode.value]();
  console.log(cell);
}

watch(mode, (mod) => {
  console.log(mod);
  pdata.puzzle.edit = mod !== "input";
});

provide(playPuzzleSymbol, pdata);
</script>

<style scoped></style>
