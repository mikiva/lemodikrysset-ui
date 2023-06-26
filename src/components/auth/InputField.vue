<template>
  <div class="flex flex-col text-left relative">
    <span>
      <label :for="inputId" v-if="labelText">{{ labelText }}</label>
      <slot></slot>
    </span>
    <input
      :id="inputId"
      class="border rounded px-1 py-1"
      :class="[loginStatus ? 'border-slate-400' : 'border-red-400']"
      :type="isPassword ? 'password' : 'text'"
      :value="modelValue"
      auto-complete="off"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <span
      v-if="icon"
      class="absolute right-1 top-1/2 z-10"
      :class="[loginStatus ? 'text-slate-500' : 'text-red-400']"
      ><span class="material-icons">{{ icon }}</span></span
    >
  </div>
</template>

<script setup>
import { inject, toRefs } from "vue";
const loginStatus = inject("loginStatus");
const props = defineProps({
  inputId: String,
  modelValue: String,
  labelText: String,
  isPassword: Boolean,
  icon: String,
});

defineEmits(["update:modelValue"]);

const { inputId, modelValue, isPassword, labelText, icon } = toRefs(props);
</script>

<style scoped></style>
