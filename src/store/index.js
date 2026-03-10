import { createStore } from 'vuex'
import { loginRequest } from '@/utils/api'

export default createStore({
  state: {
    token: localStorage.getItem('myAppToken') || '',
  },
  mutations: {
    AUTH_SUCCESS(state, token) {
      state.token = token
    },
    AUTH_ERROR(state) {
      state.token = ''
    }
  },
  actions: {
    AUTH_REQUEST: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        if (user.username === 'test' && user.password === '123') {
          const fakeToken = 'test-token-' + Date.now();
          commit('AUTH_SUCCESS', fakeToken);
          localStorage.setItem('myAppToken', fakeToken);
          resolve();
        } else {
          loginRequest(user)
            .then((token) => {
              commit('AUTH_SUCCESS', token);
              localStorage.setItem('myAppToken', token);
              resolve();
            })
            .catch((error) => {
              commit('AUTH_ERROR');
              localStorage.removeItem('myAppToken');
              reject(error);
            });
        }
      });
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token
  }
})