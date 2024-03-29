<template>
  <q-page>
    <div class="todos-list">
      <p>The todos are</p>
      <div v-for="todo in todoStore.todos" :key="todo.id">
        <p>
          <TodoCard :todo="todo" />
        </p>
      </div>
    </div>

    <div class="todos-list">
      <p>Your favorites are</p>
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
