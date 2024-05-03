<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

import { useMapStore } from '@/stores/mapStore';
import Overlay from 'ol/Overlay';

import { Feature, Map, View } from 'ol';
import { Tile as TileLayer } from 'ol/layer';
import { OSM } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import Link from 'ol/interaction/Link';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Point } from 'ol/geom';
import { toStringHDMS } from 'ol/coordinate.js';
import { toLonLat } from 'ol/proj.js';
import { Style, Icon } from 'ol/style';

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

const mapStore = useMapStore();

function createMap() {
  let map = new Map({
    target: 'map-container',
    overlays: [
      new Overlay({
        id: '0',
        element: document.getElementById('popup') as HTMLElement,
        autoPan: {
          animation: {
            duration: 250,
          },
        },
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
    ],
    view: new View({
      center: fromLonLat([0, 0]),
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
  let markerSource = markerLayer?.getSource();
  marker.setStyle(
    new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: 'src/assets/marker.png',
      }),
    })
  );
  (markerSource as VectorSource)?.addFeature(marker);
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
      let container = document.createElement('p');
      container.id = 'popup-coords';
      let hdms = toStringHDMS(toLonLat(coordinate.value));
      container.textContent = `Coordinates: ${hdms}`;
      parent.firstElementChild?.before(container);
    }
  }
}

onMounted(() => {
  createMap();
});
</script>

<template>
  <div id="map-container" @click.exact="onMapClick"></div>
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
.ol-zoom {
  top: auto;
  bottom: 1em;
  left: 0.75em;
}
</style>
