<template>
  <span
    class="material-icons absolute"
    :class="arrowClass"
    style="font-size: 14px"
  >
    {{ arrow }}</span
  >
</template>

<script setup>
import { computed, toRefs } from "vue";

const props = defineProps(["direction"]);
const { direction } = toRefs(props);

const arrow = computed(() => {
  const dir = direction.value;
  if (dir === "d") return "subdirectory_arrow_left";
  return "subdirectory_arrow_right";
});

const classes = {
  d: "-rotate-90 right-0",
  r: "bottom-0",
};

const arrowClass = computed(() => {
  return classes[direction.value];
});
</script>

<style scoped></style>
