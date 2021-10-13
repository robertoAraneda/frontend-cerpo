import httpRequest from '../../services/http';

const BASE_URL = '/api/v1/organizations';

export default {
  namespaced: true,
  state: {
    organizations: [],
  },
  mutations: {
    SET_ORGANIZATIONS: (state, payload) => {
      state.organizations = payload;
    },
  },
  getters: {
    organizations: (state) => state.organizations,
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
        commit('SET_ORGANIZATIONS', data);
      } catch (error) {
        commit('SET_ORGANIZATIONS', []);
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
