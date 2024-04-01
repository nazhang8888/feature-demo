<template>
  <div>
    <q-item>
      <q-item-section avatar>
        <q-icon name="home" />
      </q-item-section>
      <q-item-section>
        <router-link
          v-for="route in router.options.routes"
          :key="route.path"
          :to="route.path"
        >
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
</script>
