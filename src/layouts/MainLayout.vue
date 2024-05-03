<script setup lang="ts">
// import { ref } from 'vue';
// import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';

import NavigationFab from '@/components/NavigationFab.vue';
import LayersPicker from '@/components/LayersPicker.vue';
import PointPicker from '@/components/PointPicker.vue';

defineOptions({
  name: 'MainLayout',
  components: { NavigationFab, LayersPicker, PointPicker },
});

const route = useRoute();
</script>

<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="z-top">
      <q-toolbar>
        <NavigationFab />
        <q-toolbar-title> Feature Demo </q-toolbar-title>
        <PointPicker v-if="route.path === '/'" />
        <LayersPicker v-if="route.path === '/'" />
      </q-toolbar>
    </q-header>
    <KeepAlive :max="10">
      <q-page-container>
        <router-view />
      </q-page-container>
    </KeepAlive>
  </q-layout>
</template>
 
