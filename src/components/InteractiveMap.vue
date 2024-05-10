<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';

import { Feature, Map, View } from 'ol';
import Overlay from 'ol/Overlay';
import { Tile as TileLayer } from 'ol/layer';
import { OSM } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { toLonLat } from 'ol/proj.js';
import Link from 'ol/interaction/Link';
import { Point } from 'ol/geom';
import { toStringHDMS } from 'ol/coordinate.js';
import { Style, Icon } from 'ol/style';

import { useMapStore } from '@/stores/mapStore';
import PopUp from '@/components/PopUp.vue';
import { CustomOptions } from '@/utils/models';
import { useTableStore } from '@/stores/tableStore';

defineOptions({
  name: 'InteractiveMap',
  components: { PopUp },
});
const showPopUp = ref(false);
const coordinate = ref([0, 0]);
const tableStore = useTableStore();

watch(
  () => showPopUp.value,
  (value) => {
    if (value === false) {
      try {
        removeMarker();
      } catch (error) {
        console.log(error);
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
const mapStore = useMapStore();

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
      new TileLayer({
        source: new OSM(),
        name: 'OpenStreetMap',
        isBaseMap: true,
      } as CustomOptions),
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
    view: new View({
      center: [0, 0],
      zoom: 2,
    }),
  });

  map.addInteraction(new Link());

  mapStore.setMap(map);
}

function createMarker(coordinate: number[]) {
  const marker = new Feature({
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
        src: 'src/assets/marker.png',
      }),
    })
  );
  markerSource?.addFeature(marker);
  mapStore.map.getView().fit(markerSource?.getExtent());
  mapStore.map.getView().setZoom(10);
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
      .display === 'none'
  ) {
    coordinate.value = mapStore.map.getEventCoordinate(event);
    createMarker(coordinate.value);
    mapStore.map.getOverlayById('0')?.setPosition(coordinate.value);

    let parent = document.getElementById('popup');
    if (parent?.firstElementChild) {
      let container = document.createElement('div');
      container.id = 'popup-coords';

      let hdmsContainer = document.createElement('p');
      let hdms = toStringHDMS(toLonLat(coordinate.value));
      hdmsContainer.textContent = `HDMS: ${hdms}`;

      let longLatContainer = document.createElement('p');
      let longLat = toLonLat(coordinate.value);
      longLat = longLat.map((coord) => parseFloat(coord.toFixed(6)));
      longLatContainer.textContent = `Coordinates: ${longLat}`;

      let newEntry = {
        id: tableStore.popupData.length,
        name: '',
        country: '',
        longitude: longLat[0],
        latitude: longLat[1],
        description: '',
      };
      console.log(newEntry);
      tableStore.popupData.push(newEntry);

      container.appendChild(hdmsContainer);
      container.appendChild(longLatContainer);
      parent.firstElementChild?.before(container);
    }
  }

  // check for properties of the base map
}
</script>

<template>
  <div id="map-container" @click.right="onMapClick"></div>
  <PopUp
    v-show="showPopUp === true"
    :showPopUp="showPopUp"
    :coordinate="coordinate"
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
app/src/utils/models
