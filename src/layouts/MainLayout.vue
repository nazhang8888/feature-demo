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
          <q-toggle
            @click="darkToggle"
            color="white"
            v-model="value"
            name="darktoggle"
          />
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
      <NavigationPanel />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import NavigationPanel from "components/NavigationPanel.vue";

defineOptions({
  name: "MainLayout",
  components: { NavigationPanel },
});

const $q = useQuasar();
const leftDrawerOpen = ref(false);
const value = ref(false);

const darkToggle = () => {
  $q.dark.toggle();
};

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>
