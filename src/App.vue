<template>
  <main>
    <component :is="$route.meta.layout || 'div'">
      <router-view />
    </component>
  </main>
</template>

<script setup lang="ts">
defineOptions({
  name: 'App',
});
</script>
