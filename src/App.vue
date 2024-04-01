<template>
  <main>
    <component :is="$route.meta.layout || 'div'">
      <router-view />
    </component>
  </main>
</template>

<script setup>
defineOptions({
  name: "App",
});
</script>
