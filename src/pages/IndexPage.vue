<template>
  <q-page class="flex flex-center">
    <InteractiveMap />
  </q-page>
</template>

<script setup>
import InteractiveMap from "../components/InteractiveMap.vue";

defineOptions({
  name: "IndexPage",
  components: { InteractiveMap },
});
</script>
