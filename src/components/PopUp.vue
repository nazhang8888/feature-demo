<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { TabulatorFull as Tabulator } from 'tabulator-tables';

import { useTableStore } from '@/stores/tableStore';

defineOptions({
  name: 'PopUp',
});

const props = defineProps<{
  showPopUp: boolean;
}>();

watch(
  () => props.showPopUp,
  (value) => {
    if (value === true) {
      table.value?.redraw(true);
    }
  }
);

onMounted(() => {
  createTable();
});

const tableStore = useTableStore();
const table = ref<Tabulator | null>(null);
const clickEvent = ref<MouseEvent | null>(null);

const tableData = tableStore.tableData;

function createTable() {
  let container = document.createElement('div');
  container.id = 'popup-table';
  document.getElementById('popup')?.appendChild(container);
  // console.log(document.getElementById('popup-table'));
  table.value = new Tabulator('#popup-table', {
    height: '300px',
    maxHeight: '100%',

    responsiveLayout: 'hide',
    reactiveData: true,
    data: tableData,
    layout: 'fitColumns',
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

const handleClickOnPopUp = (event: MouseEvent) => {
  clickEvent.value = event;
  if (props.showPopUp) {
    event.stopImmediatePropagation();
  }
};
</script>

<template>
  <div id="popup" class="ol-popup" @click="handleClickOnPopUp"></div>
</template>

<style lang="scss">
@import '/node_modules/tabulator-tables/dist/css/tabulator.min.css';
.ol-popup {
  position: absolute;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 50px;
  left: 20px;
  width: 500px;
  height: 400px;
}
</style>
