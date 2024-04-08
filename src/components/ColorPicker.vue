<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-color v-model="hex" class="my-picker" />
  </div>
</template>

<script setup>
import { ref } from "vue";

defineOptions({
  name: "ColorPicker",
});

const hex = ref("#FF00FF");
</script>
