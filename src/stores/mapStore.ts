import { defineStore } from 'pinia';
import { Map } from 'ol';

type State = {
  map: Map;
};

export const useMapStore = defineStore('mapStore', {
  state: (): State => ({
    map: new Map({}),
  }),

  getters: {
    getMap: (state) => state.map,
  },

  actions: {
    setMap(map: Map) {
      this.map = map;
    },
  },
});
