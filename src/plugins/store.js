// store.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    username: "none"
  },
  mutations: {
    setusername(state, data) {
      state.username = data;
    }
  }
});

export default store;
