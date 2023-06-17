<script setup>
import { onMounted, ref, toRefs } from "vue";

const emit = defineEmits(["dismissToast"]);
const props = defineProps({
  toast: Object,
  duration: Number,
});

const { toast } = toRefs(props);
const remove = ref(false);
const root = ref(null);
const timeout = ref(null);

onMounted(() => {
  timeout.value = setTimeout(() => {
    remove.value = true;
  });
});

function dismiss() {
  console.log("dismiss");
  clearTimeout(timeout.value);
  remove.value = true;
}

defineExpose(dismiss);
</script>

<template>
  <div
    class="p-3 bg-slate-400 text-white rounded shadow-lg"
    ref="root"
    @click="dismiss"
  >
    {{ toast.message }}
  </div>
</template>

<style scoped></style>
