import httpRequest from '../../services/http';

const BASE_URL = '/api/v1/auth';

export default {
  namespaced: true,
  state: {
    user: null,
    access_token: null,
    role: null,
  },
  mutations: {
    SET_USER: (state, payload) => {
      state.user = payload;
    },
    SET_ACCESS_TOKEN: (state, payload) => {
      state.access_token = payload;
    },
    SET_ROLE: (state, payload) => {
      state.role = payload;
    },
  },
  getters: {
    user: (state) => state.user,
    role: (state) => state.role,
  },
  actions: {
    login: async (_, credentials) => {
      try {
        const { data } = await httpRequest.postRequest(
          `${BASE_URL}/login`,
          credentials,
        );

        return data;
      } catch (error) {
        console.log(error);
      }
    },
    attempt: async ({ commit, state }, token) => {
      if (token) {
        localStorage.setItem('access_token', token);
        commit('SET_ACCESS_TOKEN', token);
      }

      if (!state.access_token) {
        return;
      }

      try {
        const localToken = localStorage.getItem('access_token');

        if (!localToken) {
          localStorage.removeItem('access_token');
          commit('SET_ACCESS_TOKEN', null);
          commit('SET_USER', null);
          return { success: false };
        }

        httpRequest.setToken(localToken);
        const { data } = await httpRequest.getRequest(`${BASE_URL}/me`);

        const { role, ...user } = data;

        commit('SET_USER', user);
        commit('SET_ROLE', role);

        return { success: true };
      } catch (error) {
        console.log(error);
        localStorage.removeItem('access_token');
        commit('SET_ACCESS_TOKEN', null);
        commit('SET_USER', null);
        return { status: error.response.status };
      }
    },
  },
};
