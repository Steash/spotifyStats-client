import { createStore } from 'vuex'

export default createStore({
  state: {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    expiresIn: localStorage.getItem('expiresIn') || null,
  },
  getters: {
    accessToken: (state) => state.accessToken,
    refreshToken: (state) => state.refreshToken,
    expiresIn: (state) => state.expiresIn,
  },
  mutations: {
    SET_ACCESS_TOKEN(state, accessToken) {
      state.accessToken = accessToken;
      localStorage.setItem('accessToken', accessToken); // Update local storage
    },
    SET_REFRESH_TOKEN(state, refreshToken) {
      state.refreshToken = refreshToken;
      localStorage.setItem('refreshToken', refreshToken); // Update local storage
    },
    SET_EXPIRES_IN(state, expiresIn) {
      state.expiresIn = expiresIn;
      localStorage.setItem('expiresIn', expiresIn); // Update local storage
    },
  },
  actions: {
  },
  modules: {
  }
})
