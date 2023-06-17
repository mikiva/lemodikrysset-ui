<template>
  <div
    class="w-full h-full z-0 border-gray-800 grow relative transition-cell duration-100"
    :class="{ 'bg-gray-800': cell.state === 0 }"
    :style="cellStyle"
    ref="cellRef"
  >
    <span v-if="cell.start" class="text-[11px] absolute top-px left-px">{{
      cell.start
    }}</span>
    <WordDivider v-if="cell.state > 1" :state="cell.state"></WordDivider>
    <CellArrow v-if="cell.arrow" :direction="cell.arrow"></CellArrow>
    <div
      class="flex h-full items-center relative w-full font-mono animate-pop"
      :class="cellTextClasses"
      v-if="cell.letter"
    >
      <span class="block m-auto leading-none">
        {{ cell.letter }}
      </span>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
import CellArrow from "@/components/grid/CellArrow.vue";
import { ref, onMounted, watch, inject, toRefs, computed } from "vue";
import { currentScreenWidthSymbol } from "@/injectionSymbols";
import WordDivider from "@/components/grid/WordDivider.vue";

const props = defineProps(["cell", "letter", "customText"]);
const { cell, letter, customText } = toRefs(props);

const currentScreen = inject(currentScreenWidthSymbol, 0);

const cellRef = ref(null);
onMounted(setCellSize);
const cellStyle = computed(() => {
  if (cell.value.state !== 1) {
    return {
      pointerEvents: "none",
    };
  }
  return {
    textTransform: "uppercase",
  };
});

const cellTextClasses = computed(() => {
  if (customText.value) {
    return {
      [customText.value]: true,
    };
  }
  return {
    "boardmd:text-4xl boardsm:text-3xl text-2xl": true,
  };
});

watch(currentScreen, setCellSize);

function setCellSize() {
  let c = cellRef.value;
  if (c.clientWidth !== c.clientHeight) c.style.height = c.clientWidth + "px";
}
</script>

<style scoped></style>
