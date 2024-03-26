import { defineStore } from "pinia";

export const useTodoListStore = defineStore("todoListStore", {
  state: () => ({
    todos: [
      { id: 1, title: "buy some milk", isFav: false },
      { id: 2, title: "play CS2", isFav: true },
    ],
  }),

  getters: {
    doubleCount(state) {
      return state.counter * 2;
    },
  },

  actions: {
    increment() {
      this.counter++;
    },
  },
});
