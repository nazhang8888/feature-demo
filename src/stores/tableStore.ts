import { defineStore } from 'pinia';
// import sample_table from '@/assets/data/sample_table.json';
import { PointObj } from '@/utils/models';
import { LocalStorage } from 'quasar';

type State = {
  popupData: PointObj[];
  pointPickerData: PointObj[];
};

const leaderRow: PointObj = {
  id: 0,
  type: 'point',
  name: '',
  country: '',
  longitude: undefined,
  latitude: undefined,
  description: '',
};

const storage: Storage = JSON.parse(LocalStorage.getItem('tableStore') ?? '[]');

export const useTableStore = defineStore('tableStore', {
  state: (): State => ({
    pointPickerData: [
      leaderRow,
      ...(storage.savedPoints || []),
      // ...sample_table,
    ],
    popupData: [...(storage.popupPoints || [])],
  }),

  getters: {
    getPopupData: (state) => state.popupData,
    getPointPickerData: (state) => state.pointPickerData,
  },

  actions: {
    persistToLocalStorage(point: PointObj) {
      const hydrate: object = { savedPoints: [], popupPoints: [] };
      let persistedState: object = { savedPoints: [], popupPoints: [] };

      if (storage === undefined) {
        LocalStorage.set('tableStore', JSON.stringify(hydrate));
        return;
      }

      const pointsData: object[] = [];
      const popupPointsData: object[] = [];
      if (point.type === 'point') {
        this.$state.pointPickerData.map((point) => {
          if (point.id !== 0) {
            pointsData.push(point);
          }
        });
      }

      if (point.type === 'popup') {
        this.$state.popupData.map((point) => {
          popupPointsData.push(point);
        });
      }

      persistedState = {
        savedPoints: pointsData,
        popupPoints: popupPointsData,
      };
      LocalStorage.set('tableStore', JSON.stringify(persistedState));
    },
    addPoint(point: PointObj) {
      if (point.type === 'point') {
        for (let i = 1; i < this.$state.pointPickerData.length; i++) {
          this.$state.pointPickerData.map(() => {
            if (this.$state.pointPickerData[i].id !== 0) {
              this.$state.pointPickerData[i].id = i + 1;
            }
          });
        }
        this.pointPickerData.splice(1, 0, point);
      }
      if (point.type === 'popup') {
        this.popupData.push(point);
      }
      this.persistToLocalStorage(point);
    },

    updateState(point: PointObj) {
      if (point.type === 'point') {
        this.$patch(() => this.$state.pointPickerData);
      }

      if (point.type === 'popup') {
        this.$patch(() => this.$state.popupData);
      }

      this.persistToLocalStorage(point);
    },

    deletePoint(point: PointObj) {
      if (point.type === 'point') {
        this.pointPickerData = this.pointPickerData.filter((p) => {
          return p.id !== point.id;
        });
        // needs to reassign correct id to each point
        for (let i = 1; i < this.pointPickerData.length; i++) {
          this.pointPickerData.map(() => {
            if (this.pointPickerData[i].id !== 0) {
              this.pointPickerData[i].id = i;
            }
          });
        }
      }
      if (point.type === 'popup') {
        this.popupData = this.popupData.filter((p) => {
          return p.id !== point.id;
        });
      }
      this.persistToLocalStorage(point);
    },
  },
});
