<template>
  <q-fab
    flat
    dense
    round
    icon="menu"
    aria-label="Menu"
    vertical-actions-align="left"
    direction="down"
    persistent
  >
    <q-fab-action
      v-for="route in routes"
      :key="route.path"
      :to="route.path"
      style="text-decoration: none"
      exact-active-class="exact-active"
      active-class="active"
      color="primary"
      :label="route.name"
      label-position="right"
      :icon="route.meta.icon"
    />
    <q-fab-action
      @click="darkToggle"
      color="primary"
      v-model="value"
      name="darktoggle"
      icon="contrast"
    />
  </q-fab>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

defineOptions({
  name: "NavigationFab",
});

const router = useRouter();
const routes = router.options.routes.filter((route) => route.name !== "Error");
const $q = useQuasar();
const value = ref(false);

const darkToggle = () => {
  $q.dark.toggle();
};
</script>
