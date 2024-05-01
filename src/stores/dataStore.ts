import { defineStore } from 'pinia';

import countries from '@/assets/data/countries.json';
import outline from '@/assets/data/us_outline.json';
import states from '@/assets/data/us_states.json';
import counties from '@/assets/data/us_counties.json';
// import us_states_style from '@/assets/data/us_states_style.json';
// import us_counties_style from '@/assets/data/us_counties_style.json';
// import us_outline_style from '@/assets/data/us_outline_style.json';

type State = {
  layers: object;
};

export const useDataStore = defineStore('dataStore', {
  state: (): State => ({
    layers: { countries, outline, states, counties },
  }),

  getters: {
    getFeatureCollection(): string[] {
      const arr = [];
      for (const name in this.layers) {
        arr.push(name);
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
