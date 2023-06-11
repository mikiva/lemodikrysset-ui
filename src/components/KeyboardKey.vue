<template>
  <button
    class="flex h-full max-h-[44px] justify-center items-center text-md uppercase font-bold outline-1 select-none bg-slate-400/70"
    @click="keyPressed"
  >
    {{ inputKey }}
    <slot></slot>
  </button>
</template>

<script setup>
import { toRefs } from "vue";
const props = defineProps({
  inputKey: String,
  keyValue: String,
});

const { inputKey, keyValue } = toRefs(props);

function keyPressed() {
  window.dispatchEvent(
    new KeyboardEvent("keydown", {
      key: keyValue.value ? keyValue.value : inputKey.value,
    })
  );
}
</script>

<style scoped></style>
