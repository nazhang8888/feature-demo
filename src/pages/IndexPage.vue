<script setup lang="ts">
import InteractiveMap from '@/components/InteractiveMap.vue';

defineOptions({
  name: 'IndexPage',
  components: { InteractiveMap },
});
</script>

<template>
  <q-page class="flex flex-center">
    <InteractiveMap />
  </q-page>
</template>
