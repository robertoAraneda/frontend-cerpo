import httpRequest from '../../services/http';

const BASE_URL = '/api/v1/committee-results';

export default {
  namespaced: true,
  state: {
    committeeResults: [],
  },
  mutations: {
    SET_COMMITTEE_RESULTS: (state, payload) => {
      state.committeeResults = payload;
    },
  },
  getters: {
    committeeResults: (state) => state.committeeResults,
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
        commit('SET_COMMITTEE_RESULTS', data);
      } catch (error) {
        commit('SET_COMMITTEE_RESULTS', []);
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
