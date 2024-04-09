<template>
  <q-file
    v-model="files"
    label="Pick files"
    filled
    counter
    multiple
    style="max-width: 300px"
    class="col q-pa-md"
  />
</template>

<script setup>
import { ref } from "vue";

defineOptions({
  name: "FilePicker",
});

const files = ref(null);
</script>
