import { createStore } from 'vuex'

export default createStore({
  state: {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    expiresIn: localStorage.getItem('expiresIn') || null,
    userSpotifyId: localStorage.getItem('userSpotifyId') || null,
  },
  getters: {
    accessToken: (state) => state.accessToken,
    refreshToken: (state) => state.refreshToken,
    expiresIn: (state) => state.expiresIn,
    userSpotifyId: (state) => state.userSpotifyId,
    isAuthenticated: (state) => !!state.accessToken,
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
    SET_USER_SPOTIFY_ID(state, userSpotifyId) {
      state.userSpotifyId = userSpotifyId;
      localStorage.setItem('userSpotifyId', userSpotifyId); 
    },
    CLEAR_ACCESS_TOKEN(state) {
      state.accessToken = null;
      localStorage.removeItem('accessToken');
    },
    CLEAR_REFRESH_TOKEN(state) {
      state.refreshToken = null;
      localStorage.removeItem('refreshToken');
    },
    CLEAR_EXPIRES_IN(state) {
      state.expiresIn = null;
      localStorage.removeItem('expiresIn');
    },
    CLEAR_USER_SPOTIFY_ID(state) {
      state.userSpotifyId = null;
      localStorage.removeItem('userSpotifyId');
    },
    CLEAR_ALL(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.expiresIn = null;
      state.userSpotifyId = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('expiresIn');
      localStorage.removeItem('userSpotifyId');
    }
  },
  actions: {
  },
  modules: {
  }
})
