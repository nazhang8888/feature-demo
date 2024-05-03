<script setup lang="ts">
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import { useTableStore } from '@/stores/tableStore';
import { ref, onMounted } from 'vue';

defineOptions({
  name: 'PointPicker',
});

const table = ref<Tabulator | null>(null);
const showPointPicker = ref<boolean>(true);
const tableStore = useTableStore();
const tableData = tableStore.tableData;

// watch(
//   () => showPointPicker.value,
//   (value) => {
//     if (value === true) {
//       console.log(value);
//       table.value?.redraw();
//     }
//   }
// );

onMounted(() => {
  createTable();
});

function createTable() {
  let container = document.createElement('div');
  container.id = 'points-table';
  document.getElementById('points-card')?.appendChild(container);
  table.value = new Tabulator('#points-table', {
    height: '100%',
    responsiveLayout: 'hide',
    autoResize: false,
    reactiveData: true,
    data: tableData,
    layout: 'fitDataFill',
    // renderHorizontal: 'virtual',
    // rowHeader: undefined,

    columns: [
      { title: 'Name', field: 'name' },
      // { title: 'Age', field: 'age', hozAlign: 'left', formatter: 'progress' },
      { title: 'Favourite Color', field: 'col' },
      { title: 'Favourite Color', field: 'col' },
      { title: 'Favourite Color', field: 'col' },

      // {
      //   title: 'Date Of Birth',
      //   field: 'dob',
      //   sorter: 'date',
      //   hozAlign: 'center',
      // },
    ],
  });
  return table.value;
}

function pointPickerClick() {
  showPointPicker.value = !showPointPicker.value;
}
</script>

<template>
  <q-btn
    fab
    class="bg-primary"
    color="white"
    flat
    round
    icon="place"
    active-icon="place"
    @click="pointPickerClick"
  >
    <q-tooltip>
      <span>Points</span>
    </q-tooltip>
  </q-btn>
  <q-card
    id="points-card"
    v-show="showPointPicker === true"
    flat
    bordered
    dark
  />
</template>

<style lang="scss">
#points-card {
  position: absolute;
  top: 75vh;
  right: 1.5vw;
  padding: 0.5em;
  height: 22vh;
  width: 50vw;
}

#points-table {
  padding: 0em;
  height: 100%;
  width: 100%;
}
</style>
