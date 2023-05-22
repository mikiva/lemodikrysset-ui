<template>
    <div class="w-full grid gap-1 px-2 box-border grid-cols-keyboard relative grid-rows-keyboard bottom-0 max-w-gamewidth mx-auto">

        <KeyboardKey :inputKey="key" v-for="key in 'qwertyuiopå'" @key-pressed="registerPress" class="col-span-2"></KeyboardKey>
        <KeyboardKey :inputKey="key" v-for="key in 'asdfghjklöä'" @key-pressed="registerPress" class="col-span-2"></KeyboardKey>
        <KeyboardKey inputKey="ROTERA" @key-pressed="registerPress" class="col-span-4"></KeyboardKey>
        <KeyboardKey :inputKey="key" v-for="key in 'zxcvbnm'" @key-pressed="registerPress" class="col-span-2"></KeyboardKey>



    </div>
</template>

<script setup>
import KeyboardKey from "./KeyboardKey.vue";


function registerPress(evt) {
    emit("pressed", evt)
}

</script>

<style scoped>

</style>