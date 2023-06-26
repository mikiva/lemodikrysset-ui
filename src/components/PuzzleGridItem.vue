<template>
  <div
    class="w-full h-full z-1 relative transition-cell duration-100 leading-none"
    :class="[cell.state === 0 ? 'bg-slate-600' : 'bg-white']"
    :style="cellStyle"
    ref="cellRef"
  >
    <span v-if="cell.start" class="text-[11px] absolute top-px left-px">{{
      cell.start
    }}</span>
    <WordDivider v-if="cell.state > 1" :state="cell.state"></WordDivider>
    <CellArrow v-for="arrow in cell.arrow" :direction="arrow"></CellArrow>
    <CellDash v-for="dash in cell.dash" :direction="dash"></CellDash>
    <div
      class="flex h-full items-center relative w-full font-mono animate-pop"
      :class="cellTextClasses"
      v-show="cell.letter"
    >
      <div ref="cellLetter" class="inline-block m-auto leading-none">
        {{ cell.letter !== "_" ? cell.letter : "" }}
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
import CellArrow from "@/components/grid/CellArrow.vue";
import { ref, onMounted, watch, inject, toRefs, computed } from "vue";
import { currentScreenWidthSymbol } from "@/injectionSymbols";
import WordDivider from "@/components/grid/WordDivider.vue";
import CellDash from "@/components/grid/CellDash.vue";

const props = defineProps(["cell", "letter", "customText"]);
const { cell, customText } = toRefs(props);

const currentScreen = inject(currentScreenWidthSymbol, 0);

const cellRef = ref(null);
const cellLetter = ref(null);
onMounted(setCellSize);
const cellStyle = computed(() => {
  if (cell.value.state !== 1) {
    return {};
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
  return {};
});

watch(currentScreen, setCellSize);

function setCellSize() {
  let c = cellRef.value;
  let letter = cellLetter.value;
  c.style.height = c.clientWidth + "px";
  letter.style.fontSize = c.clientWidth - 5 + "px";
}
</script>

<style scoped></style>
