<template>
  <div class="flex flex-col justify-between h-full">
    <div class="relative flex gap-4 h-full">
      <PuzzleGrid class="max-w-gamewidth w-full inline-block"></PuzzleGrid>
      <div class="w-full block bg-red-100">asd</div>
    </div>
    <KeyboardGrid></KeyboardGrid>
  </div>
</template>

<script setup>
import PuzzleGrid from "@/components/PuzzleGrid.vue";
import { provide, reactive } from "vue";
import { playPuzzleSymbol } from "@/injectionSymbols";
import { emptyPuzzle } from "@/helpers";
import KeyboardGrid from "@/components/KeyboardGrid.vue";

const pdata = reactive({});
pdata.puzzle = emptyPuzzle();

provide(playPuzzleSymbol, pdata);
</script>

<style scoped></style>
