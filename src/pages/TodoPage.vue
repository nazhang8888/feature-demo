<template>
  <q-page class="q-pa-md flex items-center column">
    <div>
      <q-form
        @submit.prevent="onSubmit"
        class="q-gutter-md"
        autocomplete="off"
        ref="addTodo"
      >
        <q-input
          filled
          label="Add an item"
          lazy-rules
          v-model="newTodo"
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
        <div class="flex justify-end">
          <q-btn label="Submit" type="submit" :color="props.color" />
          <q-btn label="Reset" type="reset" :color="props.color" />
        </div>
      </q-form>
      <div class="todos-list">
        <q-item-label header
          >You have {{ todoStore.count }} item{{
            todoStore.count !== 1 ? "s" : ""
          }}</q-item-label
        >
        <div v-for="todo in todoStore.todos" :key="todo.id">
          <p>
            <TodoCard :todo="todo" />
          </p>
        </div>
      </div>

      <div class="todos-list" header>
        <q-item-label header
          >You have {{ todoStore.favoritesCount }} item{{
            todoStore.favoritesCount !== 1 ? "s" : ""
          }}</q-item-label
        >
        <div v-for="todo in todoStore.favorites" :key="todo.id">
          <p>
            <TodoCard :todo="todo" />
          </p>
        </div>
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
