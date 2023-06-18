<template>
  <span
    class="absolute w-[4px] h-[12px] block bg-black z-10"
    :class="dashClass"
    style="font-size: 14px"
  >
  </span>
</template>

<script setup>
import { computed, toRefs } from "vue";

const props = defineProps(["direction"]);
const { direction } = toRefs(props);

const classes = {
  d: "left-1/2 -translate-x-1/2 -bottom-[6px]",
  r: "-right-[2px] top-1/2 -translate-y-1/2 rotate-90",
};

const dashClass = computed(() => {
  return classes[direction.value];
});
</script>

<style scoped></style>
