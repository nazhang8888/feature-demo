<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { TabulatorFull as Tabulator } from 'tabulator-tables';

import { useTableStore } from '@/stores/tableStore';
import { latRange, longRange, validateTable } from '@/utils/helpers';
import { PointObj } from '../utils/models';

defineOptions({
  name: 'PopUp',
});

const props = defineProps<{
  showPopUp: boolean;
  coordinate: number[];
}>();

watch(
  () => props.showPopUp,
  (value) => {
    if (value === true) {
      table.value?.redraw();
    }
  }
);

onMounted(() => {
  createTable();

  table.value?.on('cellEdited', function (cell) {
    let row = cell.getRow();
    row.getCells().forEach((cell) => {
      if (table.value?.validate()) {
        cell.clearValidation();
      } else {
        cell.getInitialValue();
      }
    });
    let invalid = table.value?.getInvalidCells();

    row.getCells().forEach((cell) => {
      if (cell.getValue() === undefined || '') {
        validateTable(table.value as Tabulator);
      }
    });
    if (invalid && invalid.length === 0) {
      if (cell.getData().id === 0 && table.value?.getRowFromPosition(1)) {
        table.value?.getRowFromPosition(1)?.update({ id: 1 });
        for (let i = 1; i < table.value?.getData().length; i++) {
          let next = table.value?.getRowFromPosition(i + 1);
          next?.update({ id: i + 1 });
        }
      }
      table.value?.addRow(
        {
          id: 0,
          name: '',
          country: '',
          longitude: undefined,
          latitude: undefined,
          description: '',
        },
        true
      );
    }
  });

  // tableStore.setPopupData(table.value?.getData() || []);
  // what is this array showing up in pointpickerdata ?

  console.log(tableStore.popupData);
});

onUnmounted(() => {
  table.value?.destroy();
});

const tableStore = useTableStore();
const table = ref<Tabulator | null>(null);
const clickEvent = ref<MouseEvent | null>(null);

const popupData = tableStore.popupData;

function createTable() {
  let container = document.createElement('div');
  container.id = 'popup-table';
  document.getElementById('popup')?.appendChild(container);
  table.value = new Tabulator('#popup-table', {
    height: '300px',
    maxHeight: '100%',

    // responsiveLayout: 'hide',
    // reactiveData: true,
    data: popupData,
    layout: 'fitColumns',
    rowContextMenu: [
      {
        label: 'Delete Row',
        action: function (e, row) {
          row.delete();
        },
      },
      {
        label: 'Add to Saved Points',
        action: function (e, row) {
          tableStore.addPoint(row.getData() as PointObj);
        },
      },
    ],
    columns: [
      { title: 'Id', field: 'id', visible: false },
      {
        title: 'Name',
        field: 'name',
        editor: 'input',
        editorEmptyValue: '',
        validator: ['required', 'string'],
      },
      {
        title: 'Country',
        field: 'country',
        editor: 'input',
        editorEmptyValue: '',
      },
      {
        title: 'Longitude',
        field: 'longitude',
        editor: 'input',
        editorEmptyValue: undefined,
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
        editor: 'input',
        editorEmptyValue: undefined,
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
