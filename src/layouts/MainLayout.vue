<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="z-top">
      <q-toolbar>
        <NavigationFab />

        <q-toolbar-title> Feature Demo </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
        <div class="q-pa-md">
          <q-toggle
            @click="darkToggle"
            color="white"
            v-model="value"
            name="darktoggle"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import NavigationFab from "components/NavigationFab.vue";

defineOptions({
  name: "MainLayout",
  components: { NavigationFab },
});

const $q = useQuasar();
const value = ref(false);

const darkToggle = () => {
  $q.dark.toggle();
};
</script>
