<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { TabulatorFull as Tabulator } from 'tabulator-tables';

import { useTableStore } from '@/stores/tableStore';
import { latRange, longRange } from '@/utils/helpers';
import { PointObj } from '../utils/models';

defineOptions({
  name: 'PopUp',
});

const props = defineProps<{
  showPopUp: boolean;
  coordinate: number[];
}>();

const emit = defineEmits<{
  (e: 'update', value: boolean): void;
}>();

watch(
  () => props.showPopUp,
  (value) => {
    if (value === true) {
      table.value?.setData(tableStore.popupData);
      table.value?.redraw();
    }
  }
);

onMounted(() => {
  createTable();
});

onUnmounted(() => {
  table.value?.destroy();
});

const tableStore = useTableStore();
const table = ref<Tabulator | null>(null);
const clickEvent = ref<MouseEvent | null>(null);

function createTable() {
  let container = document.createElement('div');
  container.id = 'popup-table';
  document.getElementById('popup')?.appendChild(container);
  table.value = new Tabulator('#popup-table', {
    editTriggerEvent: 'click',
    height: '185px',
    maxHeight: '100%',
    addRowPos: 'top',

    // responsiveLayout: 'hide',
    reactiveData: false,
    data: tableStore.popupData,
    layout: 'fitColumns',
    rowDblClickMenu: [
      {
        label: 'Delete Row',
        action: function (e, row) {
          row.delete();

          let point: PointObj = {
            id: row.getData().id,
            type: 'popup',
            name: row.getData().name,
            country: row.getData().country,
            longitude: row.getData().longitude,
            latitude: row.getData().latitude,
            description: row.getData().description,
          };
          tableStore.deletePoint(point);
          tableStore.updateState(point);
          table.value?.redraw();
        },
      },
      {
        label: 'Add to Saved Points',
        action: function (e, row) {
          if (
            row.getData().name === '' ||
            row.getData().country === '' ||
            row.getData().description === ''
          ) {
            table.value?.alert(
              'Please fill remaining fields in the row to save the point.'
            );
            setTimeout(() => {
              table.value?.clearAlert();
            }, 1400);

            return;
          }

          let point = row.getData();
          let savedPoint = {
            id: 1,
            type: 'point',
            name: point.name,
            country: point.country,
            longitude: point.longitude,
            latitude: point.latitude,
            description: point.description,
          };
          tableStore.addPoint(savedPoint as PointObj);
          tableStore.updateState(savedPoint as PointObj);
          table.value?.alert('Point saved.');
          setTimeout(() => {
            table.value?.clearAlert();
          }, 1400);

          // refresh ppd table
        },
      },
    ],
    columns: [
      { title: 'Id', field: 'id', visible: false },
      {
        title: 'Type',
        field: 'type',
        visible: false,
      },
      {
        title: 'Name',
        field: 'name',
        // validator: 'required',
        editor: 'input',
      },
      {
        title: 'Country',
        field: 'country',
        // validator: 'required',
        editor: 'input',
      },
      {
        title: 'Longitude',
        field: 'longitude',
        validator: [
          {
            type: longRange,
            parameters: { min: -179.9999, max: 179.9999 },
          },
          {
            type: 'required',
          },
        ],
      },
      {
        title: 'Latitude',
        field: 'latitude',

        validator: [
          {
            type: latRange,
            parameters: { min: -89.9999, max: 89.9999 },
          },
          {
            type: 'required',
          },
        ],
      },
      {
        title: 'Description',
        field: 'description',
        editor: 'input',
        editorEmptyValue: 'z',
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
const handleKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    emit('update', false);
  }

  if (event.key === 'Tab') {
    event.preventDefault();
    console.log(table.value?.navigateRight());
  }
};
</script>

<template>
  <div
    id="popup"
    data-testid="popup-container"
    class="ol-popup"
    @click="handleClickOnPopUp"
    @keydown="handleKey"
  ></div>
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
  display: flex;
  flex-flow: column;
}
.popup-table {
  order: 5;
}
</style>
