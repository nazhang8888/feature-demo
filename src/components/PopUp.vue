<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { TabulatorFull as Tabulator } from 'tabulator-tables';

defineOptions({
  name: 'PopUp',
});

const props = defineProps<{
  showPopUp: boolean;
}>();

const table = ref<Tabulator | null>(null);
const clickEvent = ref<MouseEvent | null>(null);

watch(
  () => props.showPopUp,
  async (isShown) => {
    if (isShown === true && table.value) {
      table.value?.redraw(true);
      console.log('Table redrawn');
    }
  }
);

const tableData = [
  { id: 1, name: 'Oli Bob', age: '12', col: 'red', dob: '' },
  { id: 2, name: 'Mary May', age: '1', col: 'blue', dob: '14/05/1982' },
  {
    id: 3,
    name: 'Christine Lobowski',
    age: '42',
    col: 'green',
    dob: '22/05/1982',
  },
  {
    id: 4,
    name: 'Brendon Philips',
    age: '125',
    col: 'orange',
    dob: '01/08/1980',
  },
  {
    id: 5,
    name: 'Margret Marmajuke',
    age: '16',
    col: 'yellow',
    dob: '31/01/1999',
  },
  { id: 6, name: 'Oli Bob', age: '12', col: 'red', dob: '' },
  { id: 7, name: 'Mary May', age: '1', col: 'blue', dob: '14/05/1982' },
  {
    id: 8,
    name: 'Christine Lobowski',
    age: '42',
    col: 'green',
    dob: '22/05/1982',
  },
  {
    id: 9,
    name: 'Brendon Philips',
    age: '125',
    col: 'orange',
    dob: '01/08/1980',
  },
  {
    id: 10,
    name: 'Margret Marmajuke',
    age: '16',
    col: 'yellow',
    dob: '31/01/1999',
  },
];

const handleClick = (event: MouseEvent) => {
  clickEvent.value = event;
  if (props.showPopUp) {
    console.log('Click event:', clickEvent.value);
    event.stopImmediatePropagation();
  }
};

const createTableDiv = () => {
  let container = document.createElement('div');
  container.id = 'popup-table';
  document.getElementById('popup')?.appendChild(container);
};

const createTable = () => {
  console.log(document.getElementById('popup-table'));
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
};

onMounted(() => {
  createTableDiv();
  createTable();
});
</script>

<template>
  <div id="popup" class="ol-popup" @click="handleClick"></div>
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
  bottom: 12px;
  left: 5px;
  width: fit-content;
  height: 400px;
}
</style>
