import { defineStore } from 'pinia';

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
      { id: 0, name: 'countries', data: countries },
      { id: 1, name: 'outline', data: outline },
      { id: 2, name: 'states', data: states },
      { id: 3, name: 'counties', data: counties },
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
    getFeatureCollection(): object[] {
      const arr = [];
      for (const obj of this.layers) {
        arr.push(obj.data);
      }
      return arr;
    },
  },
  actions: {
    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // formatStruct(struct: any) {
    //   const tabulated = [];
    //   for (let i = 0; i < struct.features.length; i++) {
    //     tabulated.push(struct.features[i].properties);
    //   }
    //   return tabulated;
    // },
  },
  // },
});
