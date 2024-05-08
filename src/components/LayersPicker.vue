<script setup lang="ts">
import { useDataStore } from '../stores/dataStore';

import { ref } from 'vue';
import { useMapStore } from '../stores/mapStore';
import VectorLayer from 'ol/layer/Vector';
import { Vector as VectorSource } from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';

defineOptions({
  name: 'LayersPicker',
});

const mapStore = useMapStore();
const dataStore = useDataStore();
const activeIds = ref<string[]>([]);

function onLayerClick(event: Event) {
  let targetElement = event.target as HTMLElement;
  targetElement = targetElement.closest('.q-btn') as HTMLElement;
  let targetId = targetElement.id;

  if (activeIds.value.includes(targetId)) {
    activeIds.value = activeIds.value.filter((id) => id !== targetId);
    mapStore.map.getAllLayers().find((layer) => {
      if (layer.get('name') === targetId) {
        mapStore.map.removeLayer(layer);
      }
    });
  } else {
    activeIds.value.push(targetId);
    dataStore.layers.map((layer) => {
      if (layer.name === targetId) {
        let newLayer = new VectorLayer({
          source: new VectorSource({
            features: new GeoJSON({
              featureProjection: 'EPSG:3857',
            }).readFeatures(layer.data),
          }),
          properties: {
            name: layer.name,
          },
        });
        mapStore.map.addLayer(newLayer);
      }
    });
  }
}

function addLayerClick(event: Event) {
  console.log(event + 'Add Layer Clicked');
  console.log(mapStore.map.getAllLayers());
}
</script>

<template>
  <q-btn
    class="bg-primary"
    color="white"
    flat
    fab
    round
    icon="layers"
    active-icon="layers"
    direction="down"
  >
    <q-tooltip>
      <span>Layers</span>
    </q-tooltip>
    <q-menu
      fit
      dark
      persistent
      transition-show="jump-down"
      transition-hide="jump-up"
      anchor="bottom end"
      :offset="[-45, 20]"
      max-width="200px"
    >
      <q-list dark class="flex">
        <q-btn
          align="left"
          v-for="collection in dataStore.getFeatureCollectionNames"
          :key="collection"
          :id="collection"
          class="flex col-grow"
          :label="collection"
          :icon="
            activeIds.includes(collection)
              ? 'radio_button_checked'
              : 'radio_button_unchecked'
          "
          @click="onLayerClick"
        ></q-btn>

        <q-btn
          id="add-layer"
          class="flex col-grow"
          label="Add a new layer.."
          icon="add"
          @click="addLayerClick"
        ></q-btn>
      </q-list>
    </q-menu>
  </q-btn>
</template>
