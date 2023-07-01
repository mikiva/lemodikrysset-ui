<template>
  <template v-if="route.query.token">
    <FormBase formTitle="NYTT LÖSENORD">
      <FormPasswordResetNew></FormPasswordResetNew>
    </FormBase>
  </template>
  <template v-else>
    <FormBase formTitle="ÅTERSTÄLL LÖSENORD">
      <FormPasswordReset></FormPasswordReset>
    </FormBase>
  </template>
</template>

<script setup>
import { onMounted, provide, reactive, ref } from "vue";
import FormBase from "../components/auth/FormBase.vue";

import FormPasswordResetNew from "@/components/auth/FormPasswordResetNew.vue";
import { useRoute } from "vue-router";
import FormPasswordReset from "@/components/auth/FormPasswordReset.vue";

const errors = reactive({
  email: "",
  general: ""
})
const loginStatus = ref(true)
provide("loginStatus", loginStatus)
const route = useRoute()

const email = ref("")

onMounted(() => {
  if (route.query.token) {

  }
})

</script>

<style scoped></style>
