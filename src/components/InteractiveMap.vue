<template>
  <PopUp />
  <div id="map-container" style="height: 100vh"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import PopUp from "../components/PopUp.vue";
import { useMapStore } from "../stores/mapStore";

import { Map, View, Overlay } from "ol";
import { Tile as TileLayer } from "ol/layer";
import { OSM } from "ol/source";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { toStringHDMS } from "ol/coordinate";
import { toLonLat } from "ol/proj";

import Link from "ol/interaction/Link";
import Draw from "ol/interaction/Draw";
import Snap from "ol/interaction/Snap";

defineOptions({
  name: "InteractiveMap",
  components: { PopUp },
});

const map = ref(null);
const mapStore = useMapStore();
const source = new VectorSource();

onMounted(() => {
  const container = document.getElementById("popup");
  const closer = document.getElementById("popup-closer");
  const content = document.getElementById("popup-content");

  const overlay = new Overlay({
    element: container,
    autoPan: {
      animation: {
        duration: 250,
      },
    },
  });

  closer.onclick = function () {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
  };

  map.value = new Map({
    target: "map-container",
    overlays: [overlay],
    layers: [
      new TileLayer({
        source: new OSM(),
        name: "OpenStreetMap",
      }),
      new VectorLayer({
        source: new VectorSource({
          format: new GeoJSON(),
          url: "src/assets/data/countries.json",
        }),
      }),
    ],
    view: new View({
      center: [0, 0],
      zoom: 4,
    }),
  });

  map.value.addInteraction(new Link());

  map.value.on("singleclick", function (event) {
    const coordinate = event.coordinate;
    const hdms = toStringHDMS(toLonLat(coordinate));

    content.innerHTML = "<p>You clicked here:</p><code>" + hdms + "</code>";
    overlay.setPosition(coordinate);
  });

  mapStore.setMap(map.value);
});
</script>
