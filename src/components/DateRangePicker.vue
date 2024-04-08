<template>
  <div class="">
    <div class="q-pa-md">
      <q-date v-model="days" range multiple />
      <div class="q-pb-sm">Model: {{ days }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineOptions({
  name: "DateRangePicker",
});

const days = ref([
  { from: "2020/07/01", to: "2020/07/10" },
  { from: "2020/07/21", to: "2020/07/25" },
]);
</script>
