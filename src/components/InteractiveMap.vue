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
const coordinate = ref([0, 0]);

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
  mapStore.map.on('singleclick', function (e) {
    if (e.target === document.getElementById('popup')) {
      console.log('Map clicked');
    }
  });

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
      coordinate.value = e.coordinate;

      if (showPopUp.value === false) {
        document.getElementById('popup-coords')?.remove();
        overlay.setPosition(undefined);
      } else {
        overlay.setPosition(coordinate.value);
        mapStore.map.addOverlay(overlay);
        if (!document.getElementById('popup-coords')) {
          let container = document.createElement('p');
          container.id = 'popup-coords';
          container.textContent = `Coordinates: ${coordinate.value}`;
          let parent = document.getElementById('popup');
          let firstChild = parent?.firstChild;
          if (firstChild) {
            parent?.insertBefore(container, firstChild);
          }
        }
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
  <PopUp v-show="showPopUp === true" :showPopUp="showPopUp" />
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
