<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';

import NavigationFab from '@/components/NavigationFab.vue';
import LayersPicker from '@/components/LayersPicker.vue';
import PointPicker from '@/components/PointPicker.vue';

defineOptions({
  name: 'MainLayout',
  components: { NavigationFab, LayersPicker, PointPicker },
});

const route = useRoute();
const value = ref(true);
const $q = useQuasar();

const darkToggle = () => {
  $q.dark.toggle();
  console.log($q.dark.isActive);
};
</script>

<template>
  <q-layout view="hHh Lpr lFf">
    <q-header
      class="z-top"
      :class="$q.dark.isActive ? 'bg-dark' : 'bg-primary text-black'"
    >
      <q-toolbar>
        <NavigationFab
          :color="$q.dark.isActive ? 'dark' : 'primary'"
          :text-color="$q.dark.isActive ? 'white' : 'black'"
        />
        <q-toolbar-title> Feature Demo </q-toolbar-title>
        <PointPicker
          v-if="route.path === '/'"
          :color="$q.dark.isActive ? 'dark' : 'primary'"
          :text-color="$q.dark.isActive ? 'white' : 'black'"
        />
        <LayersPicker
          v-if="route.path === '/'"
          :color="$q.dark.isActive ? 'dark' : 'primary'"
          :text-color="$q.dark.isActive ? 'white' : 'black'"
        />
        <q-btn
          flat
          round
          unelevated
          @click="darkToggle"
          v-model="value"
          name="darktoggle"
          :icon="$q.dark.isActive ? 'nightlight_round' : 'light_mode'"
          :color="$q.dark.isActive ? 'dark' : 'primary'"
          :text-color="$q.dark.isActive ? 'white' : 'black'"
        />
      </q-toolbar>
    </q-header>
    <KeepAlive :max="10">
      <q-page-container>
        <router-view />
      </q-page-container>
    </KeepAlive>
  </q-layout>
</template>
 
