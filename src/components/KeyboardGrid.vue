<template>
  <div
    class="w-full h-full max-h-36 grid gap-1 px-2 box-border grid-cols-keyboard relative grid-rows-keyboard bottom-0 max-w-gamewidth mx-auto"
  >
    <KeyboardKey
      :inputKey="key"
      v-for="key in 'qwertyuiopå'"
      class="col-span-2"
    ></KeyboardKey>
    <KeyboardKey
      :inputKey="key"
      v-for="key in 'asdfghjklöä'"
      class="col-span-2"
    ></KeyboardKey>
    <KeyboardKey inputKey="ROTERA" class="col-span-4"></KeyboardKey>
    <KeyboardKey
      :inputKey="key"
      v-for="key in 'zxcvbnm'"
      class="col-span-2"
    ></KeyboardKey>
  </div>
</template>

<script setup>
import KeyboardKey from "./KeyboardKey.vue";
</script>

<style scoped></style>
