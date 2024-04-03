<template>
  <div id="map" style="width: 100%; height: 100vh; min-height: 400px"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Map, View } from "ol";
import { Tile as TileLayer } from "ol/layer";
import { OSM } from "ol/source";

defineOptions({
  name: "InteractiveMap",
});

const map = ref(null);

function createMap() {
  map.value = new Map({
    target: "map",
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: [0, 0],
      zoom: 2,
    }),
  });
}

onMounted(() => {
  createMap();
});
</script>
