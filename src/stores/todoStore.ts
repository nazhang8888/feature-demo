import { defineStore } from 'pinia';

import { Todo } from '@/utils/models';
import { LocalStorage } from 'quasar';

type State = {
  todos: Todo[];
};

export const useTodoStore = defineStore('todoStore', {
  state: (): State => ({
    todos: [
      { id: 0, title: 'buy some milk', isFavorite: false },
      { id: 1, title: 'play CS2', isFavorite: true },
      ...JSON.parse(LocalStorage.getItem('todoStore') ?? '[]'),
    ],
  }),

  getters: {
    getTodos(): Todo[] {
      return this.todos;
    },
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
    persistToLocalStorage() {
      const data: object[] = [];
      for (let i = 0; i < this.todos.length; i++) {
        if (this.$state.todos[i].id >= 2) {
          data.push(this.$state.todos[i]);
        }
      }
      LocalStorage.set('todoStore', JSON.stringify(data));
    },

    addTodo(todo: Todo) {
      this.todos.push(todo);
      this.persistToLocalStorage();
    },
    finishTodo(id: number | undefined) {
      this.todos = this.todos.filter((todo) => {
        return todo.id !== id;
      });
      this.persistToLocalStorage();
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
      this.persistToLocalStorage();
    },
  },
});
