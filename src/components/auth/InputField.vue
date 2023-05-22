<template>
    <input class="border border-slate-400" :type="isPassword ? 'password' : 'text'" :value="modelValue" auto-complete="off"
        @input="$emit('update:modelValue', $event.target.value)">
</template>

<script setup>
import { toRefs } from 'vue';


const props = defineProps({
    modelValue: String,
    isPassword: Boolean,
});
defineEmits(['update:modelValue'])

const { modelValue, isPassword } = toRefs(props);

</script>

<style scoped></style>