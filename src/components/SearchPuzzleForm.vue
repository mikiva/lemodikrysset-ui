<template>
  <form
    class="max-w-gamewidth mx-auto relative w-5/6 transition-colors"
    @submit.prevent="clicked"
    :class="{ 'animate-shake': notFoundEffect }"
  >
    <div class="flex flex-col items-center m-auto relative">
      <input
        type="text"
        ref="searchInput"
        id="search-puzzle"
        autocomplete="off"
        spellcheck="false"
        class="text-5xl text-center w-full z-10 bg-transparent py-2 border-2 uppercase transition-colors"
        @focus="focusing"
        @blur="focused = false"
        @input="formInput"
        v-model="code"
        maxlength="8"
        :class="{
          'border-red-200 text-red-500': notFoundEffect,
        }"
      />
      <span
        class="absolute -translate-y-1/2 text-black/50 bg-white z-10 pointer-events-none px-3 transition-all"
        :class="{
          '-left-4 -rotate-12 top-0 text-lg shadow': focused || code.length > 0,
          'left-1/2 top-1/2 -translate-x-1/2 md:text-4xl text-3xl':
            !focused && code.length === 0,
          'text-red-300': notFoundEffect,
        }"
      >
        <div class="h-full flex items-center justify-center transition-colors">
          Krysskod
        </div>
      </span>
    </div>
    <button
      ref="playButton"
      class="w-full border mt-2 text-2xl disabled:bg-gray-200 bg-gray-400 shadow-lg disabled:shadow-inherit disabled:text-gray-300 disabled:border-inherit p-2 transition-colors"
      :disabled="code.length < 2"
      type="submit"
      :class="{
        'bg-red-500/25 text-red-500': notFoundEffect,
      }"
    >
      Spela
    </button>
  </form>
</template>
<script setup>
import { onMounted, ref, toRefs, watch } from "vue";

const props = defineProps(["notFoundEffect"]);
const emit = defineEmits(["clicked", "formInput"]);
const searchInput = ref(null);
const focused = ref(false);
const code = ref("");

const { notFoundEffect } = toRefs(props);
const originalSize = ref(0);

onMounted(() => {
  originalSize.value = Math.abs(screen.height + screen.width);
});

function focusing() {
  focused.value = true;
}

function clicked() {
  emit("clicked", code.value);
}

function formInput(evt) {
  code.value = evt.target.value;
  emit("formInput", code);
}

watch(code, () => {
  code.value = code.value.toUpperCase();
});
</script>

<style scoped></style>
