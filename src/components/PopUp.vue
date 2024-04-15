<template>
  <div id="popup" class="ol-popup">
    <a href="#" id="popup-closer" class="ol-popup-closer"></a>
    <div id="popup-content"></div>
  </div>
</template>

<script setup>
defineOptions({
  name: "PopUp",
});
</script>

<style>
.ol-popup {
  position: absolute;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  padding: 15px;
  border-radius: 10px;
}

.ol-popup-closer {
  position: absolute;
  top: 2px;
  right: 8px;
  color: #c33;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
}
</style>
