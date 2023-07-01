<template>
  <template v-if="route.query.token">
    {{ route.query.token }}
  </template>
  <template v-else>
    <form-base formTitle="VERIFIERA EPOST">
      <FormVerifyEmail></FormVerifyEmail>
    </form-base>
  </template>
</template>

<script setup>
import FormBase from "../components/auth/FormBase.vue";
import FormVerifyEmail from "@/components/auth/FormVerifyEmail.vue";

import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";
import { verifyEmail } from "supertokens-web-js/lib/build/recipe/emailverification";

const route = useRoute();
const router = useRouter();

async function verifyToken() {
  try {
    const response = await verifyEmail();
    if (response.status === "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR") {
      alert("Expired token, please resend code");
      await router.replace({ name: "VerifyEmailView" });
    }
  } catch (err) {
    console.log(err);
  }
}

async function verifyToken2() {
  const url = "/api/v1/auth/u/email/verify?";
  const status = await fetch(
    url +
      new URLSearchParams({
        token: route.query.token,
      })
  );

  const ok = await status.json();
  console.log("OK", ok);
}

onMounted(async () => {
  if (route.query.token) await verifyToken();
});
</script>

<style scoped></style>
