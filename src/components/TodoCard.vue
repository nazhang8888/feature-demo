<template>
  <div class="q-px-md q-pb-none" style="max-width: 450px">
    <q-list bordered>
      <q-item v-ripple class="justify-start">
        <q-item-label class="item-center self-center col-grow">
          {{ todo.title }}
        </q-item-label>
        <div class="row">
          <q-item-section avatar class="q-pr-none q-pl-md items-center">
            <q-icon
              @click="todoStore.toggleFavorite(todo.id)"
              name="favorite"
              :class="{ activefavorite: todo.isFavorite }"
            />
            Favorite
          </q-item-section>
          <q-item-section avatar class="q-pr-none q-pl-md items-center">
            <q-icon @click="todoStore.finishTodo(todo.id)" name="done" />
            Done
          </q-item-section>
        </div>
      </q-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from '@/stores/todoStore';

defineOptions({
  name: 'TodoCard',
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  todo: Object,
});

const todoStore = useTodoStore();
</script>
