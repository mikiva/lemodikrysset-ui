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

const state =
  "110101111101111010011100111101101010101111111010011010101001111011111010100101001111111111";
const response =
  "___________lemo_________d_________i_________k_________r_________ysset";
const frontPuzzle = reactive({
  puzzle: {
    pname: "FRONT",
    state: state,
    id: "Lemodikrysset",
    wordStarts: [11],
    arrows: { d: [14], r: [64] },
    response: response,
  },
});

provide(playPuzzleSymbol, frontPuzzle);
</script>

<style scoped></style>
