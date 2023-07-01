<template>
    <div class="flex flex-col gap-3 max-w-prose m-auto shadow p-4">

        <div class="font-bold text-xl bg-red-200/50 p-2 rounded border-red-400/50 border">
            Nu har du kommit helt fel!
            <hr>
        </div>
        <div class="mt-4">

            <div class="py-2">Det finns minst två anledningar till varför du hamnade här:</div>
            <div class="bg-red-200/50 border border-red-400/50 p-2">

                <div class="font-bold pl-4">- Du har skrivit fel adress.</div>
                <div class="font-bold pl-4">- Något som ska vara här har ännu inte blivit byggt.</div>
            </div>


        </div>
        <div class="italic">(Min gissning är på det tidigare!)</div>
        <div>
            Om du inte vill vara kvar här är du välkommen att gå tillbaka till <RouterLink :to="{ name: 'IndexView' }"
                class="underline">Startsidan
            </RouterLink>
        </div>

        <div class="mt-10 italic text-sm">mvh utvecklaren</div>
    </div>
</template>

<script setup>

</script>

<style scoped></style>