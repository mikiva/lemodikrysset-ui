<template>
  <div class="m-auto max-w-appWidth p-2 text-center">
    <h1 class="text-3xl font-bold">Välkommen till Lemodikrysset</h1>
    <p>
      Tycker du vanliga musikquiz börjar bli lite enformiga? Spela ett
      lemodikryss!
    </p>
    <p>Som ett musikquiz, fast roligare.</p>
    <br />
    <div class="">
      <PuzzleGrid></PuzzleGrid>
    </div>
  </div>
</template>

<script setup>
import { provide, reactive } from "vue";
import PuzzleGrid from "@/components/PuzzleGrid.vue";
import { playPuzzleSymbol } from "@/injectionSymbols";

const state = [
  [1, 1, 0, 1, 0, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 0, 1, 0, 0, 1],
  [1, 1, 0, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
  [1, 1, 1, 1, 1, 0, 1, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
  [1, 0, 1, 0, 0, 1, 0, 1, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
const response =
  "________lemo____d______i_______k____r_____ysset______________";
const frontPuzzle = reactive({
  puzzle: {
    pname: "FRONT",
    state: state,
    id: "srtd",
    wordStarts: [],
    arrows: [
      { x: 4, y: 1, direction: "d" },
      { x: 4, y: 6, direction: "r" },
    ],
    dashes: [],
    viewSolution: true,
    response: response,
  },
});

provide(playPuzzleSymbol, frontPuzzle);
</script>

<style scoped></style>
