<template>
  <div class="todo">
    <q-list>
      <q-item>
        <q-item-label>{{ todo.title }}</q-item-label>
        <q-item-section avatar>
          <q-icon name="favorite" />
        </q-item-section>
        <q-item-section> Favorite </q-item-section>
        <q-item-section avatar>
          <q-icon name="done" />
        </q-item-section>
        <q-item-section> Done </q-item-section>
      </q-item>
    </q-list>
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
