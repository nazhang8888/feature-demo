<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="z-top">
      <q-toolbar>
        <NavigationFab />

        <q-toolbar-title> Feature Demo </q-toolbar-title>
        <LayersPicker v-if="route.path === '/'" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
// import { ref } from 'vue';
// import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';

import NavigationFab from '@/components/NavigationFab.vue';
import LayersPicker from '@/components/LayersPicker.vue';

defineOptions({
  name: 'MainLayout',
  components: { NavigationFab, LayersPicker },
});

const route = useRoute();
</script>
