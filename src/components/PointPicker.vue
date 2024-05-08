<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import {
  CellComponent,
  RowComponent,
  TabulatorFull as Tabulator,
} from 'tabulator-tables';

import { Feature } from 'ol';
import { Point } from 'ol/geom';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';
import { fromLonLat } from 'ol/proj';

import { useTableStore } from '@/stores/tableStore';
import { useMapStore } from '@/stores/mapStore';

import { longRange, latRange, validateTable, minChars } from '@/utils/helpers';
import { PointObj } from '../utils/models';

defineOptions({
  name: 'PointPicker',
});

const table = ref<Tabulator | null>(null);
const showPointPicker = ref<boolean>(false);
const pointSource = ref<VectorSource>();
const tableStore = useTableStore();
const mapStore = useMapStore();

onMounted(() => {
  createTable();

  table.value?.on('rowClick', function (event, row) {
    event.preventDefault();
    try {
      renderPoint(row);
    } catch (error) {
      console.log(`an error has occurred. ${error as Error}`);
    }
  });

  table.value?.on('cellEdited', function (cell) {
    let row = cell.getRow();
    row.getCells().forEach((cell) => {
      if (validateTable(table.value as Tabulator)) {
        cell.clearValidation();
      }
    });
  });
});

onUnmounted(() => {
  table.value?.destroy();
});

function createTable() {
  let container = document.createElement('div');
  container.id = 'points-table';
  document.getElementById('points-card')?.appendChild(container);
  table.value = new Tabulator('#points-table', {
    editTriggerEvent: 'dblclick',
    height: '100%',
    reactiveData: false,
    data: tableStore.pointPickerData,
    layout: 'fitDataStretch',
    validationMode: 'blocking',
    // responsiveLayout: 'collapse',
    // debugEventsExternal: true,
    // renderHorizontal: 'virtual',
    // persistence: true,

    // needs slow zoom onto point on singleclick

    rowContextMenu: [
      {
        label: 'Delete Row',
        action: function (e, row) {
          row.delete();
          table.value?.redraw();
        },
      },
    ],
    rowFormatter: function (row) {
      let data = row.getData();
      if (data.id !== 0) {
        row.getElement().style.backgroundColor = 'revert';
        row.getElement().style.fontStyle = 'normal';
        row.getElement().style.fontWeight = 'normal';
      }

      if (data.id === 0) {
        row.getElement().style.backgroundColor = 'lightgray';
        row.getElement().style.fontStyle = 'italic';
        row.getElement().style.fontWeight = 'lighter';
      }
    },

    columns: [
      {
        title: 'Id',
        field: 'id',
        visible: false,
        editor: 'input',
        editorEmptyValue: '',
        validator: 'required',
      },
      {
        title: 'Name',
        field: 'name',
        width: 100,
        editor: 'input',
        editorEmptyValue: '',
        validator: [
          { type: minChars, parameters: { min: 5 } },
          { type: 'string' },
          { type: 'required' },
        ],
        formatter: function placeholder(cell: CellComponent) {
          let cellValue = cell.getValue();
          if (
            cellValue === undefined ||
            (cellValue === '' && cell.getData().id === 0)
          ) {
            cellValue = 'Sydney';
          }
          return cellValue;
        },
      },
      {
        title: 'Country',
        field: 'country',
        width: 100,
        sorter: 'string',
        editor: 'input',
        editorEmptyValue: '',
        formatter: function (cell: CellComponent) {
          let cellValue = cell.getValue();

          if (cellValue === undefined || cellValue === '') {
            cellValue = 'Australia';
          }

          return cellValue;
        },
        validator: [
          { type: minChars, parameters: { min: 3 } },
          { type: 'string' },
          { type: 'required' },
        ],
      },
      {
        title: 'Longitude',
        field: 'longitude',
        width: 150,
        editor: 'input',
        editorEmptyValue: undefined,
        formatter: function placeholder(cell: CellComponent) {
          let cellValue = cell.getValue();
          if (cellValue === undefined || cellValue === '') {
            cellValue = '0.00000';
          }
          return cellValue;
        },
        validator: [
          {
            type: longRange,
            parameters: { min: -179.9999, max: 179.9999 },
          },
          {
            type: 'required',
          },
          {
            type: 'float',
          },
        ],
      },
      {
        title: 'Latitude',
        field: 'latitude',
        width: 150,
        editor: 'input',
        editorEmptyValue: undefined,
        formatter: function placeholder(cell: CellComponent) {
          let cellValue = cell.getValue();
          if (cellValue === undefined || cellValue === '') {
            cellValue = '0.00000';
          }
          return cellValue;
        },
        validator: [
          {
            type: latRange,
            parameters: { min: -89.9999, max: 89.9999 },
          },
          {
            type: 'required',
          },
          {
            type: 'float',
          },
        ],
      },
      {
        title: 'Description',
        field: 'description',
        editor: 'input',
        editorEmptyValue: '',
        formatter: function placeholder(cell: CellComponent) {
          let cellValue = cell.getValue();
          if (cellValue === undefined || cellValue === '') {
            cellValue = 'Add a description';
          }
          return cellValue;
        },
        validator: [
          { type: minChars, parameters: { min: 5 } },
          { type: 'string' },
          { type: 'required' },
        ],
      },
    ],
  });
  return table.value;
}

function pointPickerClick() {
  showPointPicker.value = !showPointPicker.value;
  // showPointPicker.value ? table.value?.redraw(true) : null;
  // let objectRows = table.value?.getRows().flatMap((row) => row.getData());
  // tableStore.pointPickerData.push(...(objectRows ?? []));
  // console.log(table.value?.getRows().flatMap((row) => row.getData()));
  // showPointPicker.value ? table.value?.getRowFromPosition(1).freeze() : null;
}

function renderPoint(row: RowComponent) {
  let pointLayer = mapStore.map
    .getAllLayers()
    .find((layer) => layer.get('name') === 'Point');
  pointSource.value = pointLayer?.getSource() as VectorSource;
  pointSource.value.clear();

  let rowData = row.getData();

  if (rowData.id !== 0 && rowData.latitude && rowData.longitude) {
    let longitude = rowData.longitude;
    let latitude = rowData.latitude;
    let coordinate = [longitude, latitude];
    coordinate = fromLonLat(coordinate);
    let point = new Point(coordinate);
    let feature = new Feature({
      geometry: point,
      name: rowData.name,
    });
    feature.setStyle(
      new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: 'src/assets/marker.png',
        }),
      })
    );

    pointSource.value.addFeature(feature);
    mapStore.map.getView().fit(pointSource.value.getExtent());
    mapStore.map.getView().setZoom(10);
  }
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    showPointPicker.value = false;
  }

  if (event.key === 'Tab') {
    event.preventDefault();
  }

  if (event.key === 'Enter') {
    event.preventDefault();

    let newLeaderRow = {
      id: 0,
      name: '',
      country: '',
      longitude: undefined,
      latitude: undefined,
      description: '',
    };

    let editedRow = tableStore.pointPickerData[0];

    let newRow = {
      id: 1,
      name: editedRow.name,
      country: editedRow.country,
      longitude: editedRow.longitude,
      latitude: editedRow.latitude,
      description: editedRow.description,
    };

    validateTable(table.value as Tabulator);
    let invalid = table.value?.getInvalidCells();

    if (invalid && invalid.length > 0) {
      return;
    }

    for (let i = 1; i < tableStore.pointPickerData.length; i++) {
      tableStore.pointPickerData.map(() => {
        if (tableStore.pointPickerData[i].id !== 0) {
          tableStore.pointPickerData[i].id = i + 1;
        }
      });
    }

    tableStore.addPoint(newRow as PointObj);
    tableStore.pointPickerData[0] = newLeaderRow;
    tableStore.updateState();
    table.value?.setData(tableStore.pointPickerData);
  }
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
    @keydown="handleKeyDown"
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
