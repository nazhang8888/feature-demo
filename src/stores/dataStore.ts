import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';

import countries from '@/assets/data/countries.json';
import outline from '@/assets/data/us_outline.json';
import states from '@/assets/data/us_states.json';
import counties from '@/assets/data/us_counties.json';

import { Layer } from 'app/src/utils/models';
// import us_states_style from '@/assets/data/us_states_style.json';
// import us_counties_style from '@/assets/data/us_counties_style.json';
// import us_outline_style from '@/assets/data/us_outline_style.json';

type State = {
  layers: Layer[];
};

export const useDataStore = defineStore('dataStore', {
  state: (): State => ({
    layers: [
      { id: 0, name: 'outline', data: outline },
      { id: 1, name: 'countries', data: countries },
      { id: 2, name: 'states', data: states },
      { id: 3, name: 'counties', data: counties },
      ...JSON.parse(LocalStorage.getItem('dataStore') ?? '[]'),
    ],
  }),

  getters: {
    getFeatureCollectionNames(): string[] {
      const arr = [];
      for (const obj of this.layers) {
        arr.push(obj.name);
      }
      return arr;
    },
    getFeatureCollections(): Layer[] {
      // const arr = [];
      // for (const obj of this.layers) {
      //   arr.push(obj.data);
      // }
      // return arr;
      return this.layers;
    },
  },
  actions: {
    persistToLocalStorage() {
      // LocalStorage.clear();
      // if (LocalStorage.isEmpty()) {
      //   console.log('empty');
      //   // LocalStorage.set(
      //   //   'dataStore',
      //   //   JSON.stringify(this.$state.layers.filter((l) => l.id <= 3))
      //   // );
      //   return;
      // }
      /* istanbul ignore next */
      const data: object[] = [];
      for (let i = 0; i < this.layers.length; i++) {
        if (this.$state.layers[i].id >= 4) {
          data.push(this.$state.layers[i]);
        }
      }
      LocalStorage.set('dataStore', JSON.stringify(data));
    },
    addFeatureCollection(layer: Layer) {
      this.$patch((state) => {
        state.layers.push(layer);
      });
      this.persistToLocalStorage();
    },
    deleteFeatureCollection(id: number) {
      this.$patch((state) => {
        state.layers = state.layers.filter((l) => {
          return l.id !== id;
        });
      });
      this.persistToLocalStorage();
    },
  },
});
