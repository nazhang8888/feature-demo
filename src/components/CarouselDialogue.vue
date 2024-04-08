<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn label="Carousel" color="primary" @click="carousel = true" />
    <q-dialog v-model="carousel">
      <q-carousel
        transition-prev="slide-right"
        transition-next="slide-left"
        swipeable
        animated
        v-model="slide"
        control-color="primary"
        navigation-icon="radio_button_unchecked"
        navigation
        padding
        height="200px"
        class="bg-white shadow-1 rounded-borders"
      >
        <q-carousel-slide :name="1" class="column no-wrap flex-center">
          <q-icon name="style" color="primary" size="56px" />
          <div class="q-mt-md text-center">{{ lorem }}</div>
        </q-carousel-slide>
        <q-carousel-slide :name="2" class="column no-wrap flex-center">
          <q-icon name="live_tv" color="primary" size="56px" />
          <div class="q-mt-md text-center">{{ lorem }}</div>
        </q-carousel-slide>
        <q-carousel-slide :name="3" class="column no-wrap flex-center">
          <q-icon name="layers" color="primary" size="56px" />
          <div class="q-mt-md text-center">{{ lorem }}</div>
        </q-carousel-slide>
        <q-carousel-slide :name="4" class="column no-wrap flex-center">
          <q-icon name="terrain" color="primary" size="56px" />
          <div class="q-mt-md text-center">{{ lorem }}</div>
        </q-carousel-slide>
      </q-carousel>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineOptions({
  name: "CarouselDialogue",
});

const slide = ref(1);

const carousel = ref(false);
const lorem =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, ratione eum minus fuga, quasi dicta facilis corporis magnam, suscipit at quo nostrum!";
</script>
