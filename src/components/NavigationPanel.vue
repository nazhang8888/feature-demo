<template>
  <div>
    <q-item>
      <q-item-section>
        <router-link v-for="route in routes" :key="route.path" :to="route.path">
          <q-item-section>
            <q-icon :name="route.meta.icon" />
            {{ route.name }}
          </q-item-section>
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
