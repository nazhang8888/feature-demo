<template>
  <div>
    <q-item>
      <q-item-section>
        <router-link v-for="route in routes" :key="route.path" :to="route.path">
          <q-item-section avatar> </q-item-section>
          {{ route.name }}
        </router-link>
      </q-item-section>
    </q-item>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

defineOptions({
  name: "NavigationPanel",
});

const router = useRouter();
const routes = router.options.routes;
</script>
