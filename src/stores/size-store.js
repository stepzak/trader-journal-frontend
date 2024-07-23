import { defineStore } from 'pinia';

export const useSizeStore = defineStore('size', {
  state: () => ({
    width: 0,
  }),
  getters: {
    getWidth: state => {return state.width}
  },
  actions: {
    setWidth(payload) {
      this.width=payload;
    },
  },
});
