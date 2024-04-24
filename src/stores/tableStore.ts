import { defineStore } from 'pinia';

type State = {
  tableData: [];
};

export const useTableStore = defineStore('tableStore', {
  state: (): State => ({
    tableData: [],
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
