<template>
  <button
    class="md:p-4 p-2"
    :class="[isActive ? 'bg-slate-500' : 'bg-slate-300']"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import { toRefs } from "vue";

const props = defineProps(["isActive"]);
const { isActive } = toRefs(props);
</script>

<style scoped></style>
