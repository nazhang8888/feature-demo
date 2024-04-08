<template>
  <q-page class="flex flex-center">
    <DataTable />
  </q-page>
</template>

<script setup>
import DataTable from "../components/DataTable.vue";

defineOptions({
  name: "TablePage",
  components: { DataTable },
});
</script>
