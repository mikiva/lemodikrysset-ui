<template>
  <Teleport to="#toast-container">
    <div
      v-if="toasts.length > 0"
      class="fixed z-50 left-1/2 -translate-x-1/2 flex flex-col gap-3 top-3"
      id="toastContainer"
      ref="toastContainer"
    >
      <ToastMessage
        v-for="toast in toasts"
        :key="toast.id"
        :toast="toast"
      ></ToastMessage>
    </div>
  </Teleport>
</template>
<script setup>
import { reactive, onMounted, onBeforeUnmount, ref, watchEffect } from "vue";
import ToastMessage from "@/components/toasts/ToastMessage.vue";
import { PUSH } from "@/injectionSymbols";
import bus from "@/services/emitter";
import { filterInPlace } from "@/helpers";

const toasts = reactive([]);

const toastContainer = ref(null);
const timestamp = () => Date.now();
const TOAST_SECONDS = 2.5;

function filterToasts() {
  if (toasts.length > 0) {
    const t = timestamp();
    filterInPlace(
      toasts,
      (toast) => !(toast.remove || t - toast.timestamp > TOAST_SECONDS * 1000)
    );
  }
}

let toastInterval;

function hasToasts() {
  if (toastInterval) return;
  toastInterval = setInterval(filterToasts, 100);
}

function addToast(toast) {
  const id = toasts.length;
  toasts.push({ id: id, timestamp: timestamp(), ...toast });
}

watchEffect(() => {
  if (toasts.length > 0) hasToasts();
  else toastInterval = clearInterval(toastInterval); //Make it undefined;
});

onMounted(() => {
  bus.on(PUSH, addToast);
});
onBeforeUnmount(() => {
  bus.off(PUSH, addToast);
});
</script>

<style scoped></style>
