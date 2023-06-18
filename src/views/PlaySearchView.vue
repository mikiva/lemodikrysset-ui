<template>
  <div
    class="text-center m-22 shadow h-full flex flex-col justify-between relative"
  >
    <div class="flex flex-col justify-center px-2">
      <h2 class="text-2xl font-bold mb-2">Spela Lemodikrysset</h2>
      <p>För att spela - fyll i krysskoden du fått av quizmästaren.</p>
    </div>
    <SearchPuzzleForm
      :code-length="CODE_LENGTH"
      @submit-code="play"
      :not-found-effect="notFoundEffect"
    ></SearchPuzzleForm>
    <KeyboardGrid></KeyboardGrid>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { PUSH } from "@/injectionSymbols";
import bus from "@/services/emitter";
import KeyboardGrid from "@/components/KeyboardGrid.vue";

const notFound = ref(false);
const notFoundEffect = ref(false);
const router = useRouter();
import PuzzleGridItem from "@/components/PuzzleGridItem.vue";
import SearchPuzzleForm from "@/components/SearchPuzzleForm.vue";
import { useRouter } from "vue-router";

const CODE_LENGTH = 5;
let timeout;

async function play(code) {
  if (code.length < CODE_LENGTH) return;
  notFound.value = false;
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
      clearTimeout(timeout);
      notFound.value = true;
      notFoundEffect.value = true;

      bus.emit(PUSH, {
        message: result.status === 404 ? "Ogiltig krysskod" : "Oväntat fel",
      });
      timeout = setTimeout(() => {
        notFoundEffect.value = false;
      }, 1000);
    } else {
      await router.push({
        name: "puzzle",
        params: { puzzleid: code },
      });
    }
  } catch (err) {
    console.log(err);
    console.log(err.status);
  }
}
</script>

<style scoped></style>
