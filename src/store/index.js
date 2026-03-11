import { createStore } from 'vuex'
import { loginRequest, logoutRequest } from '@/utils/api'

export default createStore({
  state: {
    token: localStorage.getItem('myAppToken') || '',
  },
  mutations: {
    AUTH_SUCCESS: (state, token) => {
      state.token = token;
    },
    AUTH_ERROR: (state) => {
      state.token = '';
    }
  },
  actions: {
    AUTH_REQUEST: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        loginRequest(user)
          .then((token) => {
            commit('AUTH_SUCCESS', token);
            localStorage.setItem('myAppToken', token);
            resolve();
          })
          .catch(() => {
            commit('AUTH_ERROR');
            localStorage.removeItem('myAppToken');
            reject();
          });
      });
    },
    AUTH_LOGOUT: ({ commit }) => {
      return new Promise((resolve) => {
        commit('AUTH_ERROR');
        localStorage.removeItem('myAppToken');
        resolve();
      });
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  }
});