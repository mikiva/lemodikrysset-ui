<template>
  <div
    class="w-full h-full z-0 bg-white border-gray-800 grow relative"
    :class="{ 'bg-gray-800': cell.state === '0' }"
    :style="cellStyle"
    ref="cellRef"
  >
    <span v-if="cell.start" class="text-[11px] absolute top-px left-px">{{
      cell.start
    }}</span>
    <WordDivider v-if="cell.state > 1" :state="cell.state"></WordDivider>
    <CellArrow v-if="cell.arrow" :direction="cell.arrow"></CellArrow>
    <div
      class="flex justify-center items-center relative"
      :class="letterClass"
      v-if="letter"
    >
      <span>
        {{ letter }}
      </span>
    </div>
  </div>
</template>

<script setup>
import CellArrow from "@/components/grid/CellArrow.vue";
import { ref, onMounted, watch, inject, toRefs, computed } from "vue";
import { currentScreenSymbol } from "@/injectionSymbols";
import WordDivider from "@/components/grid/WordDivider.vue";

const props = defineProps(["cell", "letter"]);
const { cell, letter } = toRefs(props);

const currentScreen = inject(currentScreenSymbol, 0);

const cellRef = ref(null);
onMounted(setCellSize);
const cellStyle = computed(() => {
  if (cell.value.state !== "1") {
    return {
      pointerEvents: "none",
    };
  }
  return {
    fontSize: "2em",
    textTransform: "uppercase",
  };
});

const letterClass = computed(() => {
  return {
    "md:text-4xl text-3xl md:top-[8%]": letter.value,
  };
});

watch(currentScreen, setCellSize);

function setCellSize() {
  let c = cellRef.value;
  if (c.clientWidth !== c.clientHeight) c.style.height = c.clientWidth + "px";
}
</script>

<style scoped></style>
