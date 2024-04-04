<template>
  <q-page>
    <div class="todos-list" header>
      <q-item-label header>You have {{ todoStore.count }} items</q-item-label>
      <div v-for="todo in todoStore.todos" :key="todo.id">
        <p>
          <TodoCard :todo="todo" />
        </p>
      </div>
    </div>

    <div class="todos-list" header>
      <q-item-label>You have {{ todoStore.favoritesCount }} items</q-item-label>
      <div v-for="todo in todoStore.favorites" :key="todo.id">
        <p>
          <TodoCard :todo="todo" />
        </p>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import TodoCard from "../components/TodoCard.vue";
import { useTodoStore } from "../stores/todoStore";

defineOptions({
  name: "TodoPage",
  components: { TodoCard },
});

const todoStore = useTodoStore();
</script>
