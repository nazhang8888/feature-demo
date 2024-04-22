import { defineStore } from 'pinia';
//disabling eslint for this file
/* eslint-disable */
export const useTodoStore = defineStore('todoStore', {
  state: () => ({
    todos: [
      { id: 0, title: 'buy some milk', isFavorite: false },
      { id: 1, title: 'play CS2', isFavorite: true },
    ],
  }),

  getters: {
    favorites(): any {
      return this.todos.filter((todo) => todo.isFavorite);
    },
    count(): any {
      return this.todos.length;
    },
    favoritesCount(): any {
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

    addTodo(todo: any) {
      this.todos.push(todo);
    },
    finishTodo(id: any) {
      this.todos = this.todos.filter((todo) => {
        return todo.id !== id;
      });
    },
    toggleFavorite(id: any) {
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
      if (!todo) {
        return;
      }

      todo.isFavorite = !todo.isFavorite;
    },
  },
});
