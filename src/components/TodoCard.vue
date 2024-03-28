<template>
  <div class="todo">
    <p>{{ todo.title }}</p>
    <div class="icons">
      <i class="material-icons">delete</i>
      <i class="material-icons">favorite</i>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: "TodoCard",
});

const props = defineProps({
  todo: Object,
});
</script>
