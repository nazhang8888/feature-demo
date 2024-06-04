<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';

import { Feature, Map, View } from 'ol';
import Overlay from 'ol/Overlay';
import { Tile as TileLayer } from 'ol/layer';
import { StadiaMaps } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { toLonLat } from 'ol/proj.js';
import Link from 'ol/interaction/Link';
import { Point } from 'ol/geom';
import { toStringHDMS } from 'ol/coordinate.js';
import { Style, Icon } from 'ol/style';

import { useMapStore } from '@/stores/mapStore';
import PopUp from '@/components/PopUp.vue';
import { CustomOptions, CustomDarkOptions } from '@/utils/models';
import { useTableStore } from '@/stores/tableStore';
import { useQuasar } from 'quasar';

defineOptions({
  name: 'InteractiveMap',
  components: { PopUp },
});

const $q = useQuasar();
const StadiaKey = process.env.STADIA_API_KEY
  ? process.env.STADIA_API_KEY
  : 'key is invalid';
const showPopUp = ref(false);
const coordinate = ref([0, 0]);
const tableStore = useTableStore();
const mapStore = useMapStore();

const lightModeLayer: CustomOptions = new TileLayer({
  name: 'StadiaMaps',
  preload: Infinity,
  source: new StadiaMaps({
    apiKey: StadiaKey,
    layer: 'alidade_smooth',
    retina: false,
  }),
  isBaseMap: true,
} as CustomOptions);

const darkModeLayer: CustomDarkOptions = new TileLayer({
  name: 'StadiaMapsDark',
  source: new StadiaMaps({
    apiKey: StadiaKey,
    layer: 'alidade_smooth_dark',
    retina: false,
  }),
  preload: Infinity,
  isDark: $q.dark.isActive,
} as CustomDarkOptions);

const view = new View({
  center: [0, 0],
  zoom: 2,
});

watch(
  () => showPopUp.value,
  (value) => {
    if (value === false) {
      try {
        removeMarker();
        // view.animate({
        //   center: [0, 0],
        //   duration: 2000,
        //   zoom: 0,
        // });
      } catch (error) {
        console.log(error as Error);
      }
    }
  }
);

watch(
  () => $q.dark.isActive,
  (value) => {
    if (value === true) {
      try {
        mapStore.map.addLayer(darkModeLayer);
        mapStore.map.removeLayer(lightModeLayer);
        // replace marker with white marker
        mapStore.map.render();
        console.info('load successful');
      } catch (error) {
        console.log(error as Error);
      }
    }

    if (value === false) {
      try {
        mapStore.map.addLayer(lightModeLayer);
        mapStore.map.removeLayer(darkModeLayer);
        mapStore.map.render();
        console.info('load successful');
      } catch (error) {
        console.log(error as Error);
      }
    }
  }
);

onMounted(() => {
  createMap();
});

onUnmounted(() => {
  mapStore.map.dispose();
});

function createMap() {
  const map = new Map({
    target: 'map-container',
    overlays: [
      new Overlay({
        id: '0',
        element: document.getElementById('popup') as HTMLElement,
      }),
    ],
    layers: [
      lightModeLayer,
      new VectorLayer({
        source: new VectorSource(),
        properties: {
          name: 'Marker',
        },
      }),
      new VectorLayer({
        source: new VectorSource(),
        properties: {
          name: 'Point',
        },
      }),
    ],
    view: view,
  });

  map.addInteraction(new Link());

  mapStore.setMap(map);
}

function createMarker(coordinate: number[]) {
  const marker = new Feature({
    name: 'Marker',
    geometry: new Point(coordinate),
  });

  let markerLayer = mapStore.map
    .getAllLayers()
    .find((layer) => layer.get('name') === 'Marker');
  let markerSource = markerLayer?.getSource() as VectorSource;
  marker.setStyle(
    new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: $q.dark.isActive
          ? 'src/assets/darkmarker.png'
          : 'src/assets/marker.png',
      }),
    })
  );
  markerSource?.addFeature(marker); // marker should be on top
  markerLayer?.setZIndex(1000);
  view.animate({
    center: [coordinate[0], coordinate[1]],
    duration: 2000,
    zoom: 10,
  });

  // mapStore.map.getView().fit(markerSource?.getExtent());
  // mapStore.map.getView().setZoom(10);
}

function removeMarker() {
  let markerLayer = mapStore.map
    .getAllLayers()
    .find((layer) => layer.get('name') === 'Marker');
  let markerSource = markerLayer?.getSource();
  let markerFeature = (markerSource as VectorSource)?.getFeatures()[0];
  (markerSource as VectorSource)?.removeFeature(markerFeature as Feature);
  mapStore.map.getOverlayById('0')?.setPosition(undefined);
  let parent = document.getElementById('popup');
  parent?.firstElementChild?.remove();
}

function onMapClick(event: MouseEvent) {
  event.preventDefault();
  showPopUp.value = !showPopUp.value;

  if (
    window.getComputedStyle(document.getElementById('popup') as HTMLElement)
      .display !== 'none'
  ) {
    return;
  }

  coordinate.value = mapStore.map.getEventCoordinate(event);
  createMarker(coordinate.value);
  mapStore.map.getOverlayById('0')?.setPosition(coordinate.value);

  let parent = document.getElementById('popup');

  let container = document.createElement('div');
  container.id = 'popup-coords';
  container.style.flex = '1';

  let hdmsContainer = document.createElement('p');
  let hdms = toStringHDMS(toLonLat(coordinate.value));
  hdmsContainer.textContent = `HDMS: ${hdms}`;

  let longLatContainer = document.createElement('p');
  let longLat = toLonLat(coordinate.value);
  longLat = longLat.map((coord) => parseFloat(coord.toFixed(6)));
  longLatContainer.textContent = `Coordinates: ${longLat[0]}, ${longLat[1]}`;

  let infoContainer = document.createElement('div');

  let newEntry = {
    id: tableStore.popupData.length,
    type: 'popup',
    name: '',
    country: '',
    longitude: longLat[0],
    latitude: longLat[1],
    description: '',
  };
  const pixel = mapStore.map.getPixelFromCoordinate(coordinate.value);
  let countyText = document.createElement('p');
  let counties: string[] = [];

  mapStore.map.getFeaturesAtPixel(pixel).forEach((feature) => {
    let layer = feature.getProperties();

    if (feature.getId()) {
      let idText = document.createElement('p');
      idText.textContent = `Country ID: ${feature.getId() as string}`;
      infoContainer.appendChild(idText);
      newEntry.country = layer.name;
    }

    if (layer.LSAD === '' && feature.getId() === undefined) {
      let stateText = document.createElement('p');
      stateText.textContent = `State: ${layer.NAME}`;
      infoContainer.appendChild(stateText);
    }
    if (layer.COUNTY) {
      console.log(layer.COUNTY);
      counties.push(` ${layer.NAME} County`);
    }
  });
  if (counties.length > 0) {
    countyText.textContent = `Counties: ${counties as string[]}
         `;
    infoContainer.appendChild(countyText);
  }

  tableStore.addPoint(newEntry);
  tableStore.updateState(newEntry);

  container.appendChild(hdmsContainer);
  container.appendChild(longLatContainer);
  container.appendChild(infoContainer);
  parent?.firstElementChild?.before(container);

  // check for properties of the base map
}
</script>

<template>
  <div id="map-container" @click.right="onMapClick"></div>
  <PopUp
    v-show="showPopUp === true"
    :showPopUp="showPopUp"
    :coordinate="coordinate"
    @update="showPopUp = $event"
    :class="$q.dark.isActive ? 'bg-dark' : 'bg-primary text-black'"
  />
</template>

<style lang="scss">
@import '/node_modules/ol/ol.css';

#map-container {
  height: 95vh;
  width: 100vw;
  margin: 0;
  padding: 0;
}
.ol-zoom {
  top: auto;
  bottom: 1em;
  left: 0.75em;
}
</style>
