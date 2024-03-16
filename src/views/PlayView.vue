<template>
  <div class="block relative h-full">
    <div v-if="puzzleFound" class="flex flex-col h-full justify-between">
      <div class="flex flex-col gap-4">
        <p class="text-center">
          {{ pdata.puzzle.name }} - {{ pdata.puzzle.publicId }}
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
import http from "@/services/httpservice"
const route = useRoute();
const pdata = reactive({});
const puzzleFound = computed(() => {
  return pdata?.puzzle?.publicId;
});


async function initPuzzle() {

  const response = await http.get(
    "/api/v1/play/puzzle?" +
    new URLSearchParams({
      p: route.params.puzzleid,
    })
  );

  const puzzle = await response.json();
  console.log(puzzle);
  pdata.puzzle = { ...puzzle };
  const localPuzzle = getPuzzle(puzzle.publicId);
  let userInput;
  if (localPuzzle) {
    userInput = JSON.parse(localPuzzle).response;
  }
  if (userInput) {
    pdata.puzzle.response = userInput;
  } else {
    const initResponse = "_".repeat(
      puzzle.gridDimensions.reduce((a, b) => a * b, 1)
    );
    console.log(initResponse);
    pdata.puzzle.response = initResponse;
  }
  console.log(pdata.puzzle);
  console.log("mount listener");
}


onMounted(() => {
  initPuzzle()
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
