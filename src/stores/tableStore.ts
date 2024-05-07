import { defineStore } from 'pinia';
import sample_table from '@/assets/data/sample_table.json';
import { pointPickerData, popupData } from '@/utils/models';

type State = {
  popupData: Array<object>;
  pointPickerData: Array<object>;
};

export const useTableStore = defineStore('tableStore', {
  state: (): State => ({
    popupData: [
      {
        id: 0,
        name: '',
        Longitude: undefined,
        Latitude: undefined,
        description: '',
        country: '',
      } as popupData,
      ...sample_table.map((row: object) => row),
    ],
    pointPickerData: [
      {
        id: 0,
        name: '',
        Longitude: undefined,
        Latitude: undefined,
        description: '',
        country: '',
      } as pointPickerData,
      ...sample_table.map((row: object) => row),
    ],
  }),

  getters: {
    getPopupData: (state) => state.popupData,
    getPointPickerData: (state) => state.pointPickerData,
  },

  actions: {
    setPopupData(tableData: Array<object>) {
      this.popupData.push(tableData);
    },
    setPointPickerData(pointPickerData: Array<object>) {
      this.pointPickerData.push(pointPickerData);
    },
    addPointPickerData(data: object) {
      this.pointPickerData.push(data);
    },
    addPopupData(data: object) {
      this.popupData.push(data);
    },
  },
});
