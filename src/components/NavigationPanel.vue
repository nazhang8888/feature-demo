<template>
  <div class="q-pa-md">
    <q-item class="q-pl-sm">
      <q-item-section>
        <router-link
          v-for="route in routes"
          :key="route.path"
          :to="route.path"
          style="text-decoration: none"
          exact-active-class="exact-active"
          active-class="active"
        >
          <q-item-section>
            <q-icon
              :name="route.meta.icon"
              size="xl"
              :color="props.color"
              class="q-pb-md justify-center"
            />
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

const props = defineProps({
  color: String,
});

const router = useRouter();
const routes = router.options.routes.filter((route) => route.name !== "Error");
</script>
