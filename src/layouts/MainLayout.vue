<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="z-top">
      <q-toolbar>
        <NavigationFab />

        <q-toolbar-title> Feature Demo </q-toolbar-title>
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
</script>
