import { createStore } from 'vuex'
import { loginRequest, logoutRequest } from '@/utils/api'

export default createStore({
  state: {
    token: localStorage.getItem('myAppToken') || '',
    cart: []
  },
  mutations: {
    AUTH_SUCCESS(state, token) {
      state.token = token
    },
    AUTH_ERROR(state) {
      state.token = ''
    },
    ADD_TO_CART(state, productId) {
      if (!state.cart.includes(productId)) {
        state.cart.push(productId);
      }
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
          .catch((error) => {
            commit('AUTH_ERROR');
            localStorage.removeItem('myAppToken');
            reject(error);
          });
      });
    },
    AUTH_LOGOUT: ({ commit, state }) => {
      return new Promise((resolve, reject) => {
        if (state.token) {
          logoutRequest(state.token)
            .then(() => {
              commit('AUTH_ERROR');
              localStorage.removeItem('myAppToken');
              resolve();
            })
            .catch((error) => {
              commit('AUTH_ERROR');
              localStorage.removeItem('myAppToken');
              reject(error);
            });
        } else {
          commit('AUTH_ERROR');
          localStorage.removeItem('myAppToken');
          resolve();
        }
      });
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    isInCart: (state) => (productId) => state.cart.includes(productId)
  }
})