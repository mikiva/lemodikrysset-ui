<template>
    <div class="block relative h-full">

        <div class="flex flex-col h-full justify-between">
            <PuzzleGrid></PuzzleGrid>
            <KeyboardGrid></KeyboardGrid>
        </div>
    </div>
</template>

<script setup>
import PuzzleGrid from '../components/PuzzleGrid.vue';
import KeyboardGrid from "../components/KeyboardGrid.vue"
</script>

<style scoped></style>