<template>

    <div class="grid grid-rows-9 grid-cols-10  border-slate-600 box-border border mx-auto  md:w-[499px] md:h-[449px] w-[269px] h-[242px]">
        <div v-for="[x,y] in grid">
            <puzzle-grid-item :class="[
                (x < dimension.x)  ? 'border-r-2': '',
                (y < dimension.y ) ? 'border-b-2': '',

                ]" ></puzzle-grid-item>
        </div>
    </div>

</template>

<script setup>
import { ref, reactive, computed } from "vue";
import PuzzleGridItem from "./PuzzleGridItem.vue";
const dimension = reactive({ x: 9, y: 10 })


const grid = computed(() => {
    const g = []
    for (let i = 0; i < dimension.x; i++) {
        for (let j = 0; j < dimension.y; j++) {
            g.push([i,j])
            
        }
    }
    return g
})



</script>

<style scoped>

</style>