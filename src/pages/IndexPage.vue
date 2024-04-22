<template>
  <q-page class="flex flex-center">
    <InteractiveMap />
  </q-page>
</template>

<script setup lang="ts">
// import { ref } from 'vue';
// import { useMapStore } from '@/stores/mapStore';
import InteractiveMap from '@/components/InteractiveMap.vue';

defineOptions({
  name: 'IndexPage',
  components: { InteractiveMap },
});

// const mapStore = useMapStore();
</script>
