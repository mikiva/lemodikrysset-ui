<template>
  <template v-if="!resetSent">

    <form @submit.prevent="passwordRequest" class="grid grid-cols-1 gap-3 text-center">
      <p class="text-left text-sm text-slate-600">Mata in din epostadress för att återställa ditt lösenord. </p>
      <InputField input-id="request-email" v-model="email" icon="person" labelText="Epost"></InputField>
      <button class="bg-blue-300 py-1 rounded border shadow-md disabled:bg-blue-300/30 disabled:text-slate-400/50"
        type="submit" :disabled="trySend" value="Login">
        <span>ÅTERSTÄLL</span>
      </button>
    </form>
  </template>
  <template v-if="resetSent && sentOK">
    <div class="p-4 bg-green-200/50 border-green-400/50 border text-slate-800 rounded text-sm">
      Email har skickats med instruktioner för hur du återställer till lösenord. Om inget mail mottagits, kontrollera
      skräpposten.
    </div>
  </template>
</template>

<script setup>
import { ref, reactive, provide } from "vue";
import { sendPasswordResetEmail } from "supertokens-web-js/recipe/thirdpartyemailpassword";

import InputField from "./InputField.vue";
const resetSent = ref(false)
const sentOK = ref(false)

const email = ref("");
const password = ref("");
const trySend = ref(false);
const loginStatus = ref(true);
const errors = reactive({
  email: "",
});

async function passwordRequest() {
  try {
    if (!email.value) return;
    trySend.value = true;
    loginStatus.value = true;
    errors.email = "";
    let response = await sendPasswordResetEmail({
      formFields: [
        {
          id: "email",
          value: email.value,
        },
      ],
    });
    if (response.status === "FIELD_ERROR") {
      response.formFields.forEach((field) => {
        if (field.id === "email") errors.email = field.error;
      });
    } else if (response.status === "WRONG_CREDENTIALS_ERROR") {
      loginStatus.value = false;
      console.log("ERROR CRED");
    } else {
      sentOK.value = response.status === "OK"
      loginStatus.value = sentOK.value;
      resetSent.value = sentOK.value;

      //window.location.href = "/profile";
    }
  } catch (err) {
    console.log(err.message);
  } finally {
    trySend.value = false;
  }
}
</script>

<style scoped></style>
