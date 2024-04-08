<template>
  <q-table
    row-key="id"
    separator="cell"
    v-model:selected="selected"
    selection="multiple"
    no-data-label="No records found."
    :rows="[
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
    ]"
    :columns="[
      {
        name: 'id',
        label: 'id',
        field: 'id',
        align: 'left',
        sortable: true,
      },
    ]"
    :visible-columns="['id']"
  >
  </q-table>
</template>

<script setup>
import { ref } from "vue";

defineOptions({
  name: "DataTable",
});

const selected = ref();
</script>
