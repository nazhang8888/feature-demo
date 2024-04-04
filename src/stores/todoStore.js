import { defineStore } from "pinia";

export const useTodoStore = defineStore("todoStore", {
  state: () => ({
    todos: [
      { id: 1, title: "buy some milk", isFavorite: false },
      { id: 2, title: "play CS2", isFavorite: true },
    ],
    name: "Example User",
  }),

  getters: {
    favorites() {
      return this.todos.filter((todo) => todo.isFavorite);
    },
    count() {
      return this.todos.length;
    },
    favoritesCount() {
      return this.todos.reduce((previous, current) => {
        return current.isFavorite ? previous + 1 : previous;
      }, 0);
    },
  },

  actions: {
    addTodo(todo) {
      this.todos.push(todo);
    },
    finishTodo(id) {
      this.todos = this.todos.filter((todo) => {
        return todo.id !== id;
      });
    },
    toggleFavorite(id) {
      const todo = this.todos.find((todo) => todo.id === id);
      todo.isFavorite = !todo.isFavorite;
    },
  },
});
