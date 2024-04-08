<template>
  <q-page class="fit row wrap justify-evenly items-start content-start">
    <DateRangePicker />
    <ColorPicker />
    <CarouselDialog />
  </q-page>
</template>

<script setup>
import DateRangePicker from "../components/DateRangePicker.vue";
import ColorPicker from "../components/ColorPicker.vue";
import CarouselDialog from "../components/CarouselDialogue.vue";

defineOptions({
  name: "GalleryPage",
  components: { DateRangePicker, ColorPicker, CarouselDialog },
});
</script>
