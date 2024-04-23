import { defineStore } from 'pinia';

import { Todo } from '@/models';

type State = {
  todos: Todo[];
};

export const useTodoStore = defineStore('todoStore', {
  state: (): State => ({
    todos: [
      { id: 0, title: 'buy some milk', isFavorite: false },
      { id: 1, title: 'play CS2', isFavorite: true },
    ],
  }),

  getters: {
    favorites(): Todo[] {
      return this.todos.filter((todo) => todo.isFavorite);
    },
    count(): number {
      return this.todos.length;
    },
    favoritesCount(): number {
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

    addTodo(todo: Todo) {
      this.todos.push(todo);
    },
    finishTodo(id: number | undefined) {
      this.todos = this.todos.filter((todo) => {
        return todo.id !== id;
      });
    },
    toggleFavorite(id: number | undefined) {
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
