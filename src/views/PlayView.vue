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
import { playPuzzleSymbol } from "@/injectionSymbols";

const observers = [];

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
  window.addEventListener("keydown", handleKeyPress);
});
function handleKeyPress(key) {
  const k = key.key.toLowerCase();
  if (k.match(/^[a-zåäö]$/)) {
    console.log(k);
    observers.forEach((notify) => {
      notify(k);
    });
  } else console.log("NO");
}

provide(playPuzzleSymbol, pdata);
provide("observers", observers);
onBeforeUnmount(() => window.removeEventListener("keydown", handleKeyPress));
</script>

<style scoped></style>
