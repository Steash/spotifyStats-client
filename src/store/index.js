import { createStore } from 'vuex'

export default createStore({
  state: {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    expiresIn: localStorage.getItem('expiresIn') || null,
    userId: localStorage.getItem('userId') || null,
  },
  getters: {
    accessToken: (state) => state.accessToken,
    refreshToken: (state) => state.refreshToken,
    expiresIn: (state) => state.expiresIn,
    userId: (state) => state.userId,
  },
  mutations: {
    SET_ACCESS_TOKEN(state, accessToken) {
      state.accessToken = accessToken;
      localStorage.setItem('accessToken', accessToken); 
    },
    SET_REFRESH_TOKEN(state, refreshToken) {
      state.refreshToken = refreshToken;
      localStorage.setItem('refreshToken', refreshToken); 
    },
    SET_EXPIRES_IN(state, expiresIn) {
      state.expiresIn = expiresIn;
      localStorage.setItem('expiresIn', expiresIn); 
    },
    SET_USER_ID(state, userId) {
      state.userId = userId;
      localStorage.setItem('userId', userId); 
    },
  },
  actions: {
  },
  modules: {
  }
})
