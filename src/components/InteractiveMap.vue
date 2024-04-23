<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { useMapStore } from '@/stores/mapStore';
// import { useDataStore } from '@/stores/dataStore';
import Overlay from 'ol/Overlay';

import { Map, View } from 'ol';
import { Tile as TileLayer } from 'ol/layer';
import { OSM } from 'ol/source';
// import GeoJSON from 'ol/format/GeoJSON';
// import VectorLayer from 'ol/layer/Vector';
// import VectorSource from 'ol/source/Vector';
// import { VectorImage } from 'ol/layer';
import { fromLonLat } from 'ol/proj';

import Link from 'ol/interaction/Link';
import PopUp from '@/components/PopUp.vue';

interface CustomOptions extends TileLayer<OSM> {
  source?: OSM;
  name?: string;
  isBaseMap?: boolean;
}

defineOptions({
  name: 'InteractiveMap',
  components: { PopUp },
});

const showPopUp = ref(false);

const mapStore = useMapStore();

function createMap() {
  let map = new Map({
    target: 'map-container',
    overlays: [],
    layers: [
      new TileLayer({
        source: new OSM(),
        name: 'OpenStreetMap',
        isBaseMap: true,
      } as CustomOptions),
      // new VectorLayer({
      //   source: vectorSourceCountries,
      // }),
      // new VectorLayer({
      //   source: vectorSourceOutline,
      // }),
      // new VectorLayer({
      //   source: vectorSourceStates,
      // }),
      // new VectorLayer({
      //   source: vectorSourceCounties,
      //   style: null,
      // }),
    ],
    view: new View({
      center: fromLonLat([0, 0]),
      zoom: 2,
    }),
  });

  map.addInteraction(new Link());

  mapStore.setMap(map);
}
// const dataStore = useDataStore();

// const vectorSourceCountries = new VectorSource({
//   features: new GeoJSON({ featureProjection: "EPSG:3857" }).readFeatures(
//     dataStore.countries.countries
//   ),
// });
// const vectorSourceOutline = new VectorSource({
//   features: new GeoJSON({ featureProjection: "EPSG:3857" }).readFeatures(
//     dataStore.outline.outline
//   ),
// });
// const vectorSourceStates = new VectorSource({
//   features: new GeoJSON({ featureProjection: "EPSG:3857" }).readFeatures(
//     dataStore.states.states
//   ),
// });
// const vectorSourceCounties = new VectorSource({
//   features: new GeoJSON({ featureProjection: "EPSG:3857" }).readFeatures(
//     dataStore.counties.counties
//   ),
// });

function onClick() {
  showPopUp.value = !showPopUp.value;
  if (showPopUp.value) {
    let container = document.getElementById('popup') as HTMLElement;
    let overlay = new Overlay({
      element: container,
      autoPan: {
        animation: {
          duration: 250,
        },
      },
    });
    mapStore.map.on('singleclick', function (e) {
      if (showPopUp.value === false) {
        overlay.setPosition(undefined);
      } else {
        const coordinate = e.coordinate;
        overlay.setPosition(coordinate);
        mapStore.map.addOverlay(overlay);
      }
    });
  }
}

onMounted(() => {
  createMap();
});
</script>

<template>
  <div id="map-container" @click="onClick()"></div>
  <PopUp v-show="showPopUp === true" />
</template>

<style lang="scss">
@import '/node_modules/ol/ol.css';

#map-container {
  height: 95vh;
  width: 100vw;
  margin: 0;
  padding: 0;
}
</style>
