<template>
  <div
    class="w-full h-full max-h-40 grid gap-1 px-2 box-border grid-cols-keyboard relative grid-rows-keyboard bottom-0 max-w-appWidth mx-auto"
  >
    <KeyboardKey
      :inputKey="key"
      v-for="key in 'qwertyuiopå'"
      class="col-span-2"
    ></KeyboardKey>
    <KeyboardKey
      :inputKey="key"
      v-for="key in 'asdfghjklöä'"
      class="col-span-2"
    ></KeyboardKey>
    <KeyboardKey key-value=" " class="col-span-4">
      <span class="material-icons-outlined">height</span>
      <span class="material-icons-outlined rotate-90">height</span>
    </KeyboardKey>
    <KeyboardKey
      :inputKey="key"
      v-for="key in 'zxcvbnm'"
      class="col-span-2"
    ></KeyboardKey>
    <KeyboardKey key-value="backspace" inputKey="" class="col-span-4"
      ><span class="material-icons-outlined">backspace</span></KeyboardKey
    >
  </div>
</template>

<script setup>
import KeyboardKey from "./KeyboardKey.vue";
import { onBeforeUnmount, onMounted } from "vue";
import { handleKeyPress } from "@/services/inputservice";

onMounted(() => {
  window.addEventListener("keydown", handleKeyPress);
});
onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeyPress);
});
</script>

<style scoped></style>
