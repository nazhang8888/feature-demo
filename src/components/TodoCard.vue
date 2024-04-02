<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-list bordered>
      <q-item clickable v-ripple>
        <q-item-label>{{ todo.title }}</q-item-label>
        <q-item-section avatar>
          <q-icon color="primary" name="favorite" />
          Favorite
        </q-item-section>
        <q-item-section avatar>
          <q-icon color="primary" name="done" />
          Done
        </q-item-section>
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
