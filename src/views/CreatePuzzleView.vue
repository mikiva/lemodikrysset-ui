<template>
  <div class="flex flex-col justify-between h-full">
    <div class="relative flex gap-4 h-full">
      <PuzzleGrid
        @select-cell="(selectCell) => (current = selectCell)"
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
const puzzleGrid = ref(null);

const modes = ["input", "dark", "arrow", "dash", "divider"];

const mode = ref("");
watch(puzzleGrid, (sel) => {
  console.log(sel);
});

provide(playPuzzleSymbol, pdata);
</script>

<style scoped></style>
