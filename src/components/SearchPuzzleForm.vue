<template>
  <div class="max-w-gamewidth m-auto relative w-5/6">
    <div class="flex flex-col items-center m-auto border-2">
      <input
        type="text"
        ref="searchInput"
        id="search-puzzle"
        autocomplete="off"
        spellcheck="false"
        class="text-5xl text-center border-none w-full z-10 bg-transparent py-2 uppercase"
        @focus="focused = true"
        @blur="focused = false"
        v-model="code"
        maxlength="8"
      />
      <span
        class="absolute -translate-y-1/2 text-black/50 bg-white z-10 transition-all pointer-events-none px-3"
        :class="{
          'left-3 top-0 text-lg': focused || code.length > 0,
          'left-1/2 top-1/2 -translate-x-1/2 md:text-4xl text-3xl':
            !focused && code.length === 0,
        }"
        >Krysskod</span
      >
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";

const searchInput = ref(null);
const focused = ref(false);
const code = ref("");

watch(code, () => {
  code.value = code.value.toUpperCase();
});
</script>

<style scoped></style>
