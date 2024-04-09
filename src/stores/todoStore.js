import { defineStore } from "pinia";

export const useTodoStore = defineStore("todoStore", {
  state: () => ({
    todos: [
      { id: 0, title: "buy some milk", isFavorite: false },
      { id: 1, title: "play CS2", isFavorite: true },
    ],
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
    // Ex. asynchronous action when implementing backend.
    // async getTasks() {
    //   const res = await fetch("endpoint/todos")
    //   const data = res.json()
    //   this.todos = data
    // },

    addTodo(todo) {
      this.todos.push(todo);
    },
    finishTodo(id) {
      this.todos = this.todos.filter((todo) => {
        return todo.id !== id;
      });
    },
    toggleFavorite(id) {
      // Ex. asynchronous action when implementing backend.
      // const res = await fetch("endpoint/todos/" + id, {
      //  method: "PATCH",
      //  body: JSON.stringify({ isFavorite: todo.isFavorite }),
      //  headers: {"Content-Type: "application/json"}
      // })
      // if (res.error) {
      //   console.log(res.error)
      // }
      const todo = this.todos.find((todo) => todo.id === id);
      todo.isFavorite = !todo.isFavorite;
    },
  },
});
