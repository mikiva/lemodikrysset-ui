<template>
  <div>
    <div
      class="grid grid-rows-9 grid-cols-10 border-gray-800 box-border border-r border-b mx-auto max-w-[499px] max-h-[449px] w-full"
    >
      <div v-for="[x, y, data] in grid.grid">
        <puzzle-grid-item
          @click="selectCell(`${x}-${y}`)"
          :class="[
            x < dimension.x ? 'border-t' : '',
            y < dimension.y ? 'border-l' : '',
            selected === `${x}-${y}` ? 'bg-slate-300' : '',
          ]"
          :cell="data"
          :letter="grid.letters[`${x}-${y}`]"
        >
        </puzzle-grid-item>
      </div>
    </div>

    <p>Selected cell: {{ selected || "none" }}</p>
    <p>Direction: {{ direction }}</p>
  </div>
</template>

<script setup>
import { reactive, inject, onBeforeMount, provide, ref } from "vue";
import PuzzleGridItem from "./PuzzleGridItem.vue";
import { playPuzzleSymbol } from "@/injectionSymbols";

const { puzzle } = inject(playPuzzleSymbol);
const dimension = reactive({ x: 10, y: 9 });

const grid = reactive({ grid: [], letters: {} });
const wordStarts = {};
const observe = inject("observers");
observe.push(notify);
const selected = ref("");

const direction = ref("h");

function notify(key) {
  grid.letters[selected.value] = key;
}

function parseWordStarts() {
  let w = 0;
  puzzle.wordStarts.forEach((s) => {
    wordStarts[`${s.x}-${s.y}`] = ++w;
  });
}

const arrows = {};

function selectCell(cellId) {
  selected.value = cellId;
  if (selected.value === cellId)
    direction.value = direction.value === "h" ? "v" : "h";
  //TODO: Highlight cells based on direction
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
  const data = { state: puzzle.state[y][x] };
  if (data.state === "0") return data;
  const w = `${x}-${y}`;
  if (w in wordStarts) data.start = wordStarts[w];
  if (w in arrows) data.arrow = arrows[w];

  return data;
}

onBeforeMount(() => {
  parseWordStarts();
  parseArrows();

  parseGrid();
});

provide("letters", grid.letters);
</script>

<style scoped></style>
