import { defineStore } from 'pinia';
import sample_table from '@/assets/data/sample_table.json';

type State = {
  tableData: [];
};

export const useTableStore = defineStore('tableStore', {
  state: (): State => ({
    tableData: sample_table as [],
  }),

  getters: {
    getTableData: (state) => state.tableData,
  },

  actions: {
    setTableData(tableData: []) {
      this.tableData = tableData;
    },
  },
});
