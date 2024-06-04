<script setup lang="ts">
import { useRouter } from 'vue-router';

defineOptions({
  name: 'NavigationFab',
});

const router = useRouter();
const routes = router.options.routes.filter((route) => route.name !== 'Error');
</script>

<template>
  <q-fab
    dense
    flat
    round
    unelevated
    padding="sm"
    icon="menu"
    active-icon="menu"
    aria-label="Menu"
    vertical-actions-align="left"
    direction="down"
    persistent
  >
    <template v-slot:tooltip>
      <q-tooltip>
        <span>Menu</span>
      </q-tooltip>
    </template>
    <q-fab-action
      id="nav-fab-action"
      unelevated
      round
      outlines
      v-for="route in routes"
      :key="route.path"
      :to="route.path"
      style="width: 120px; border: solid 2px lightgray"
      align="start"
      exact-active-class="exact-active"
      active-class="active"
      :color="$q.dark.isActive ? 'dark' : 'primary'"
      :text-color="$q.dark.isActive ? 'white' : 'black'"
      :label="String(route.name)"
    >
      <template v-slot:icon>
        <q-icon :name="route.meta ? String(route.meta.icon) : ''" />
      </template>
    </q-fab-action>
  </q-fab>
</template>
