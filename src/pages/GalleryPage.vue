<template>
  <q-page class="fit">
    <div class="row items-center">
      <DateRangePicker class="col" />
      <ColorPicker class="col justify-center" />
      <CarouselDialog class="col flex justify-center" />
    </div>
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
