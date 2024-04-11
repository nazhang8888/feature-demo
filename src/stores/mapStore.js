import { defineStore } from "pinia";

export const useMapStore = defineStore("mapStore", {
  state: () => ({
    map: {},
  }),

  getters: {
    getMap: (state) => state.map,
  },

  actions: {
    setMap(map) {
      this.map = map;
    },
  },
});
