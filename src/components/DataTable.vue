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
        name: 'M855',
        caliber: '5.56x45mm NATO',
        origin: 'US',
      },
      {
        id: 2,
        name: '7.62x51mm NATO',
        caliber: '7.62x51mm NATO',
        origin: 'US',
      },
      {
        id: 3,
        name: '7.62x39mm ',
        caliber: '7.62x39mm',
        origin: 'USSR',
      },
      {
        id: 4,
        name: '.50 BMG',
        caliber: '12.7x99mm NATO',
        origin: 'US',
      },
      {
        id: 5,
        name: '.45 ACP',
        caliber: '11.43x23mm',
        origin: 'US',
      },
      {
        id: 6,
        name: '9x19 Parabellum',
        caliber: '9x19mm',
        origin: 'US',
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
      {
        name: 'name',
        label: 'Name',
        field: 'name',
        align: 'left',
        sortable: true,
      },
      {
        name: 'caliber',
        label: 'Caliber',
        field: 'caliber',
        align: 'left',
        sortable: true,
      },
      {
        name: 'origin',
        label: 'Origin',
        field: 'origin',
        align: 'left',
        sortable: true,
      },
    ]"
    :visible-columns="['name', 'caliber', 'origin']"
  >
  </q-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
  name: 'DataTable',
});

const selected = ref();
</script>
