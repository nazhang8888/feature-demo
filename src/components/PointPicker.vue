<script setup lang="ts">
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import { useTableStore } from '@/stores/tableStore';
import { ref, onMounted } from 'vue';

defineOptions({
  name: 'PointPicker',
});

const table = ref<Tabulator | null>(null);
const tableStore = useTableStore();
const tableData = tableStore.tableData;

onMounted(() => {
  createTable();
});

function createTable() {
  let container = document.createElement('div');
  container.id = 'points-table';
  document.getElementById('points-card')?.appendChild(container);
  table.value = new Tabulator('#points-table', {
    height: '100%',
    maxHeight: '100%',
    responsiveLayout: 'hide',
    autoResize: false,
    reactiveData: true,
    data: tableData,
    layout: 'fitColumns',
    renderHorizontal: 'virtual',

    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Age', field: 'age', hozAlign: 'left', formatter: 'progress' },
      { title: 'Favourite Color', field: 'col' },
      {
        title: 'Date Of Birth',
        field: 'dob',
        sorter: 'date',
        hozAlign: 'center',
      },
    ],
  });
  return table;
}
</script>

<template>
  <q-fab
    class="bg-primary"
    color="white"
    flat
    dense
    round
    icon="place"
    active-icon="place"
  >
    <!-- <q-fab-action class="bg-primary" label="Add a new point.." icon="add">
    </q-fab-action> -->
    <q-card id="points-card" flat bordered dark> </q-card>
  </q-fab>
</template>

<style lang="scss">
#points-card {
  position: absolute;
  top: 75vh;
  right: -2vw;
  margin: 0;
  padding: 0.5em;
  height: 22vh;
  width: 40vw;
}
</style>
