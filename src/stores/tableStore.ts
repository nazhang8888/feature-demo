import { defineStore } from 'pinia';
import sample_table from '@/assets/data/sample_table.json';

type State = {
  tableData: [];
  pointPickerData: [];
};

export const useTableStore = defineStore('tableStore', {
  state: (): State => ({
    tableData: sample_table as [],
    pointPickerData: [],
  }),

  getters: {
    getTableData: (state) => state.tableData,
    getPointPickerData: (state) => state.pointPickerData,
  },

  actions: {
    setTableData(tableData: []) {
      this.tableData = tableData;
    },
    setPointPickerData(pointPickerData: []) {
      this.pointPickerData = pointPickerData;
    },
  },
});
