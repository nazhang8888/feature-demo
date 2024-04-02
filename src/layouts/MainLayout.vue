<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="z-top">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Feature Demo </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
        <div class="q-pa-md">
          <q-toggle @click="darkToggle" color="white" v-model="value" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :width="100"
      show-if-above
      bordered
      overlay
      behavior="desktop"
    >
      <q-list>
        <NavigationPanel />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import NavigationPanel from "components/NavigationPanel.vue";
import { useQuasar } from "quasar";

defineOptions({
  name: "MainLayout",
  components: { NavigationPanel },
});

const leftDrawerOpen = ref(false);
const $q = useQuasar();
const value = ref(false);

function darkToggle() {
  $q.dark.toggle();
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
