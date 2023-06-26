<template>
  <div class="block relative h-full">
    <div v-if="puzzleFound" class="flex flex-col h-full justify-between">
      <div class="flex flex-col gap-4">
        <p class="text-center">
          {{ pdata.puzzle.pname }} - {{ pdata.puzzle.id }}
        </p>
        <PuzzleGrid class="p-2"></PuzzleGrid>
      </div>
      <KeyboardGrid></KeyboardGrid>
    </div>
  </div>
</template>

<script setup>
import PuzzleGrid from "../components/PuzzleGrid.vue";
import KeyboardGrid from "../components/KeyboardGrid.vue";
import { onMounted, reactive, provide, computed, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import {
  addKeyPressObserverSymbol,
  playPuzzleSymbol,
} from "@/injectionSymbols";

import { addKeyPressObserver } from "@/services/inputservice";
import { getPuzzle } from "@/storage";

const route = useRoute();
const pdata = reactive({});
const puzzleFound = computed(() => {
  return pdata?.puzzle?.id;
});

onMounted(async () => {
  const response = await fetch(
    "/api/v1/play/puzzle?" +
      new URLSearchParams({
        p: route.params.puzzleid,
      })
  );

  const puzzle = await response.json();

  pdata.puzzle = puzzle;
  const localPuzzle = getPuzzle(puzzle.id);
  let userInput;
  if (localPuzzle) userInput = JSON.parse(localPuzzle).response;
  if (userInput) pdata.puzzle.response = userInput;
  else {
    pdata.puzzle.response = "_".repeat(
      puzzle.gridDimensions.reduce((a, b) => a * b, 1)
    );
  }
  console.log("mount listener");

  //window.addEventListener("keydown", handleKeyPress);
});

provide(playPuzzleSymbol, pdata);
provide(addKeyPressObserverSymbol, addKeyPressObserver);
onBeforeUnmount(() => {
  console.log("unmount listener");
  // window.removeEventListener("keydown", handleKeyPress);
});
</script>

<style scoped></style>
