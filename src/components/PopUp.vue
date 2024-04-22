<template>
  <div id="popup" class="ol-popup">
    <a href="#" id="popup-closer" class="ol-popup-closer"></a>
    <div id="popup-content"></div>
  </div>
</template>

<script setup lang="ts">
// import { ref, watch, computed, onMounted } from 'vue';
// import { useMapStore } from '@/stores/mapStore';
//   import { useDataStore } from 'src/stores/dataStore';
// import { Map, Overlay } from 'ol';
//   import Feature from 'ol/Feature';

// import VectorSource from 'ol/source/Vector';
// import { VectorImage } from 'ol/layer';
// import { toStringHDMS } from 'ol/coordinate';
// import { fromLonLat, toLonLat } from 'ol/proj';

defineOptions({
  name: 'PopUp',
});

//   const title = ref('');
//   const rows = ref([]);
//   const columns = ref([]);
//   const current = ref(1);
//   const maxPage = ref(0);
//   const featureProps = ref([]);
// const mapStore = useMapStore();

// const map = computed(() => mapStore.getMap);

// function popUpClick() {
//   let highlight_layer = new VectorImage({
//     source: new VectorSource({}),
//   });

//   map.value.addLayer(highlight_layer);

//   const container = document.getElementById('popup');
//   const closer = document.getElementById('popup-closer');

//   const overlay = new Overlay({
//     element: container,
//     autoPan: {
//       animation: {
//         duration: 250,
//       },
//     },
//   });

//   window.onload = function () {
//     closer.onclick = function () {
//       highlight_layer.getSource().clear();
//       overlay.setPosition(undefined);
//       closer.blur();
//       return false;
//     };
//   };

//   let self = this;
//   map.value.on('singleclick', function (event) {
// const coordinate = event.coordinate;
// const hdms = toStringHDMS(toLonLat(coordinate));
// console.log(self + container);
// const content = document.getElementById('popup-content');
// content.innerHTML = ` Coordinates: ${hdms} `;

// overlay.setPosition(coordinate);
//   });
// }
// onMounted(() => {
//   console.log('onMounted click' + map.value);
//   popUpClick();
// });

// watch(map, () => {
//   popUpClick();
// });
</script>

<style lang="scss">
.ol-popup {
  position: absolute;
  background-color: none;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 12px;
  left: -50px;
  min-width: 280px;
}
.ol-popup:after,
.ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: '';
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}
.ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}
.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}
.ol-popup-closer:after {
  content: '✖';
}
</style>
