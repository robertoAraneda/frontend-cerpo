import httpRequest from '../../services/http';

const BASE_URL = '/api/v1/communes';

export default {
  namespaced: true,
  state: {
    communes: [],
  },
  mutations: {
    SET_COMMUNES: (state, payload) => {
      state.communes = payload;
    },
  },
  getters: {
    communes: (state) => state.communes,
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
        commit('SET_COMMUNES', data);
      } catch (error) {
        commit('SET_COMMUNES', []);
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

    putItem: async (_, payload) => {
      try {
        return await httpRequest.putRequest(
          `${BASE_URL}/${payload.code}`,
          payload,
        );
      } catch (e) {
        return e.response;
      }
    },

    deleteItem: async (_, payload) => {
      try {
        return await httpRequest.deleteRequest(`${BASE_URL}/${payload.code}`);
      } catch (e) {
        return e.response;
      }
    },
  },
};
