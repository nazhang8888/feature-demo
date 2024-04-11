<template>
  <q-fab flat dense round icon="menu" aria-label="Menu" direction="down">
    <q-fab-action
      v-for="route in routes"
      :key="route.path"
      :to="route.path"
      style="text-decoration: none"
      exact-active-class="exact-active"
      active-class="active"
      color="primary"
    >
      <q-icon
        :name="route.meta.icon"
        size="45px"
        color="inherit"
        class="justify-center"
      />
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
