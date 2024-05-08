import { defineStore } from 'pinia';
import sample_table from '@/assets/data/sample_table.json';
import { PointObj, PopupObj } from '@/utils/models';

type State = {
  popupData: PopupObj[];
  pointPickerData: PointObj[];
};

export const useTableStore = defineStore('tableStore', {
  state: (): State => ({
    pointPickerData: [
      {
        id: 0,
        name: '',
        country: '',
        longitude: undefined,
        latitude: undefined,
        description: '',
      },
      ...sample_table,
    ],
    popupData: [],
  }),

  getters: {
    getPopupData: (state) => state.popupData,
    getPointPickerData: (state) => state.pointPickerData,
  },

  actions: {
    addPoint(point: PointObj) {
      this.pointPickerData.splice(1, 0, point);
    },
    addPopup(popup: PopupObj) {
      this.popupData.push(popup);
    },
    updateState() {
      this.$patch(() => this.$state.pointPickerData);
    },
  },
});
