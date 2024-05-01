<script setup lang="ts">
import { useDataStore } from '../stores/dataStore';

//   import { ref, watch } from 'vue';
//   import { useMapStore } from '../stores/mapStore';

//   import { Vector as VectorSource } from 'ol/source';
//   import { VectorImage } from 'ol/layer';
//   import GeoJSON from 'ol/format/GeoJSON';

defineOptions({
  name: 'LayersPicker',
});

const dataStore = useDataStore();
function renderList() {
  // let featureCollections = dataStore.getFeatureCollections;
  // // let parent = document.getElementById('layers-picker');
  // let sibling =
  // console.log(sibling);
  // if (sibling !== null) {
  //   for (let collection in featureCollections) {
  //     console.log(collection);
  //     let button = document.createElement('q-fab-action');
  //     // parent?.firstChild?.before(button);
  //     button.innerHTML = collection;
  //     sibling?.before(button);
  //   }
  // }
}
</script>

<template>
  <q-fab
    class="bg-primary"
    color="white"
    flat
    dense
    round
    icon="layers"
    active-icon="layers"
    vertical-actions-align="right"
    direction="down"
    @click="renderList"
    persistent
  >
    <q-fab-action
      v-for="collection in dataStore.getFeatureCollection"
      :key="collection"
      class="bg-primary"
      :label="collection"
      icon="radio_button_checked"
    >
    </q-fab-action>
    <q-fab-action
      class="bg-primary"
      label="Add a new layer.."
      icon="add"
      @click="renderList"
    >
    </q-fab-action>
  </q-fab>
</template>
