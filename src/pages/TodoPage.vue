<template>
  <q-page class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-input
        filled
        label="Add an item"
        lazy-rules
        v-model="newTodo"
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <div>
        <q-btn label="Submit" type="submit" :color="props.color" />
      </div>
    </q-form>
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
import { ref } from "vue";
import TodoCard from "../components/TodoCard.vue";
import { useTodoStore } from "../stores/todoStore";

defineOptions({
  name: "TodoPage",
  components: { TodoCard },
});

const props = defineProps({
  color: String,
});

const todoStore = useTodoStore();
const newTodo = ref("");

const onSubmit = () => {
  if (newTodo.value.length > 0) {
    todoStore.addTodo({
      title: newTodo.value,
      isFavorite: false,
      id: todoStore.count + 1,
    });
    newTodo.value = "";
  }
};
</script>
