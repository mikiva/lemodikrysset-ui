<template>
    <div class="flex flex-col text-left">
        <span>
            <label :for="inputId" v-if="labelText">{{ labelText }}</label>
            <slot></slot>
        </span>
        <input :id="inputId" class="border border-slate-400 rounded px-1 py-1" :type="isPassword ? 'password' : 'text'"
            :value="modelValue" auto-complete="off" @input="$emit('update:modelValue', $event.target.value)">
    </div>
</template>

<script setup>
import { toRefs } from 'vue';

const props = defineProps({
    inputId: String,
    modelValue: String,
    labelText: String,
    isPassword: Boolean,
});




defineEmits(['update:modelValue'])

const { inputId, modelValue, isPassword, labelText } = toRefs(props);

</script>

<style scoped></style>