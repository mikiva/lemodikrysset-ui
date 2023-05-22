<template>
<button class="flex h-[44px] justify-center items-center text-md uppercase font-bold outline-1 select-none bg-slate-400/70">{{ inputKey }}</button>
</template>

<script setup>
import { toRefs } from 'vue';

const props = defineProps({
    inputKey: String
})

const {inputKey} = toRefs(props)
</script>

<style scoped></style>