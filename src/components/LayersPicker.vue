<template>
  <q-fab
    class="bg-primary"
    color="white"
    flat
    dense
    round
    icon="expand_more"
    vertical-actions-align="right"
    direction="down"
  >
    <q-fab-action class="bg-primary" label="Add a new layer.." icon="add">
    </q-fab-action>
  </q-fab>
</template>

<script setup>
//   import { ref, watch } from 'vue';
//   import { useMapStore } from '../stores/mapStore';

//   import { Vector as VectorSource } from 'ol/source';
//   import { VectorImage } from 'ol/layer';
//   import GeoJSON from 'ol/format/GeoJSON';

defineOptions({
  name: 'LayersPicker',
});

//   const mapStore = useMapStore();

// const addLayers = () => {
//   layers.forEach((layer) => {
//     mapStore.map.addLayer(
//       new VectorImage({
//         source: new VectorSource({
//           features: new GeoJSON({
//             featureProjection: "EPSG:3857",
//           }).readFeatures(layer.layer),
//         }),
//         name: layer.name,
//       })
//     );
//   });
// };

// watch(mapStore.map, () => {
//   addLayers();
// });

// const toggleLayer = (layer) => {
//   layer.setVisible(!layer.getVisible());
// };
</script>
