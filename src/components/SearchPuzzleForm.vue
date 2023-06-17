<template>
  <div
    class="max-w-gamewidth mx-auto relative w-5/6 transition-colors"
    :class="{ 'animate-shake': notFoundEffect }"
  >
    <div class="flex flex-col justify-center relative items-center gap-5">
      <div
        class="text-xl font-bold transition-colors"
        :class="{ 'text-red-400': notFoundEffect }"
      >
        Krysskod
      </div>
      <div class="flex m-auto max-w-xl w-full">
        <PuzzleGridItem
          v-for="c in codeLength"
          :cell="{ state: 1, letter: code[c - 1], start: c }"
          class="shadow-lg border-b-2 border w-15 col-span-2 transition-colors"
          :custom-text="'boardmd:text-5xl boardsm:text-3xl text-2xl'"
          :class="[
            code.length === c - 1 ? 'bg-gray-400 animate-pulse' : 'b',
            { 'text-red-400 border-red-400 bg-red-100': notFoundEffect },
          ]"
        >
        </PuzzleGridItem>
      </div>
      <button
        ref="playButton"
        class="m-auto w-1/2 border mt-2 text-2xl disabled:bg-gray-200 bg-gray-400 shadow-lg disabled:shadow-inherit disabled:text-gray-300 disabled:border-inherit p-2 transition-colors"
        :disabled="code.length < codeLength"
        @click="submitCode"
        :class="{
          'bg-red-500/25 text-red-500': notFoundEffect,
        }"
      >
        Spela
      </button>
    </div>
  </div>
</template>
<script setup>
import { computed, onBeforeUnmount, onMounted, ref, toRefs, watch } from "vue";
import PuzzleGridItem from "@/components/PuzzleGridItem.vue";

const props = defineProps(["notFoundEffect", "codeLength"]);
const emit = defineEmits(["submitCode", "formInput"]);
const searchInput = ref(null);
const focused = ref(false);
const code = ref("");

const { notFoundEffect, codeLength } = toRefs(props);
const originalSize = ref(0);

import {
  addKeyPressObserver,
  removeKeyPressObserver,
} from "@/services/inputservice";

function onCodePress(key) {
  if (key.match(/^[a-zåäö]$/)) {
    if (code.value.length === codeLength.value) return;
    code.value += key.toUpperCase();
  } else if (key === "backspace") code.value = code.value.slice(0, -1);
  else if (key === "enter") submitCode();
}

function submitCode() {
  emit("submitCode", code.value.toLowerCase());
}

watch(code, () => {
  code.value = code.value.toUpperCase();
});

onMounted(() => {
  originalSize.value = Math.abs(screen.height + screen.width);
  addKeyPressObserver(onCodePress);
});
onBeforeUnmount(() => {
  removeKeyPressObserver(onCodePress);
});
</script>

<style scoped></style>
