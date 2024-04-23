<script setup lang="ts">
// import { useMapStore } from '@/stores/mapStore';

// const mapStore = useMapStore();
</script>

<template>
  <div id="popup" class="ol-popup">
    <div id="popup-content">
      <p>Here!</p>
    </div>
  </div>
</template>

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
</style>
