<template>
  <span class="relative w-full h-full flex justify-center items-center">
    <span v-if="state === 2" class="w-1/2 m-auto h-1/6 bg-black"></span>
    <span v-if="state === 3" class="w-1/6 m-auto h-1/2 bg-black block"></span>
  </span>
</template>

<script setup>
import { toRefs } from "vue";

const props = defineProps(["state"]);
const { state } = toRefs(props);
</script>

<style scoped></style>
