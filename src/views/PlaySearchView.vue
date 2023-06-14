<template>
  <div
    class="text-center m-2 py-2 px-4 shadow h-2/3 flex flex-col justify-center relative"
  >
    <h2 class="text-2xl font-bold mb-2">Spela Lemodikrysset</h2>
    <p class="">För att spela - fyll i krysskoden du fått av quizmästaren.</p>
    <div class="h-full flex flex-col justify-center">
      <SearchPuzzleForm
        :not-found-effect="notFoundEffect"
        @clicked="play"
        @form-input="formInput"
      >
      </SearchPuzzleForm>
    </div>
  </div>
</template>

<script setup>
import SearchPuzzleForm from "@/components/SearchPuzzleForm.vue";
import { ref } from "vue";

const notFound = ref(false);
const notFoundEffect = ref(false);

function formInput() {
  notFound.value = false;
}

async function play(code) {
  console.log(code);
  notFound.value = true;
  const url = "/api/v1/play/puzzle/exists?";
  try {
    const result = await fetch(
      url +
        new URLSearchParams({
          p: code,
        })
    );
    const exists = result.status === 204;
    if (!exists) {
      notFound.value = true;
      notFoundEffect.value = true;
    }
    setTimeout(() => {
      notFoundEffect.value = false;
    }, 1000);
  } catch (err) {
    console.log(err.status);
  }
}
</script>

<style scoped></style>
