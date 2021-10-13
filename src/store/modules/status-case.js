import httpRequest from '../../services/http';

const BASE_URL = '/api/v1/status-cases';

export default {
  namespaced: true,
  state: {
    statusCases: [],
  },
  mutations: {
    SET_STATUS_CASES: (state, payload) => {
      state.statusCases = payload;
    },
  },
  getters: {
    statusCases: (state) => state.statusCases,
  },
  actions: {
    showItem: async (_, url) => {
      try {
        return await httpRequest.getRequest(url);
      } catch (e) {
        return e.response;
      }
    },

    getItems: async ({ commit }) => {
      try {
        const { data } = await httpRequest.getRequest(`${BASE_URL}`);
        console.log(data);
        commit('SET_STATUS_CASES', data);
      } catch (error) {
        commit('SET_STATUS_CASES', []);
        console.log(error);
      }
    },

    postItem: async (_, payload) => {
      try {
        return await httpRequest.postRequest(`${BASE_URL}`, payload);
      } catch (e) {
        return e.response;
      }
    },

    patchItem: async (_, payload) => {
      try {
        return await httpRequest.patchRequest(
          `${BASE_URL}/${payload.id}`,
          payload,
        );
      } catch (e) {
        if (e.response.status === 401) window.location.replace('/login');
        return e.response;
      }
    },

    deleteItem: async (_, payload) => {
      try {
        return await httpRequest.deleteRequest(`${BASE_URL}/${payload.id}`);
      } catch (e) {
        return e.response;
      }
    },
  },
};
