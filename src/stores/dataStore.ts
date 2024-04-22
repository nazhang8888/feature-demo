import { defineStore } from 'pinia';

import countries from '@/assets/data/countries.json';
import us_outline from '@/assets/data/us_outline.json';
import us_states from '@/assets/data/us_states.json';
import us_counties from '@/assets/data/us_counties.json';
import us_states_style from '@/assets/data/us_states_style.json';
import us_counties_style from '@/assets/data/us_counties_style.json';
import us_outline_style from '@/assets/data/us_outline_style.json';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDataStore = defineStore('dataStore', {
  state: () => ({
    countries: { countries },
    outline: { outline: us_outline, style: us_outline_style },
    states: { states: us_states, style: us_states_style },
    counties: { counties: us_counties, style: us_counties_style },
  }),

  actions: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formatStruct(struct: any) {
      const tabulated = [];
      for (let i = 0; i < struct.features.length; i++) {
        tabulated.push(struct.features[i].properties);
      }
      return tabulated;
    },
  },
});
