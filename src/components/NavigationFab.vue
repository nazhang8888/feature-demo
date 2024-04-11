<template>
  <q-fab
    flat
    dense
    round
    icon="menu"
    aria-label="Menu"
    vertical-actions-align="left"
    direction="down"
    push
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
    >
    </q-fab-action>
  </q-fab>
</template>

<script setup>
import { useRouter } from "vue-router";

defineOptions({
  name: "NavigationFab",
});

const router = useRouter();
const routes = router.options.routes.filter((route) => route.name !== "Error");
</script>
