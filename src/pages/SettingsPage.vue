<template>
  <q-page class="fit">
    <div class="row items-center justify-around">
      <DateRangePicker class="col-md-auto" />
      <ColorPicker class="col-md-auto justify-center" />
      <CarouselDialog class="col-md-auto flex justify-center" />
      <FilePicker class="col-md-auto flex justify-center" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import DateRangePicker from '@/components/DateRangePicker.vue';
import ColorPicker from '@/components/ColorPicker.vue';
import CarouselDialog from '@/components/CarouselDialogue.vue';
import FilePicker from '@/components/FilePicker.vue';

defineOptions({
  name: 'SettingsPage',
  components: { DateRangePicker, ColorPicker, CarouselDialog, FilePicker },
});
</script>
