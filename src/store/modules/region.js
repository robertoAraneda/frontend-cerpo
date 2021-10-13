import httpRequest from '../../services/http';

const BASE_URL = '/api/v1/regions';

export default {
  namespaced: true,
  state: {
    regions: [],
    communesByRegion: [],
  },
  mutations: {
    SET_REGIONS: (state, payload) => {
      state.regions = payload;
    },
    SET_COMUNES_BY_REGION: (state, payload) => {
      state.communesByRegion = payload;
    },
  },
  getters: {
    regions: (state) => state.regions,
    communesByRegion: (state) => state.communesByRegion,
  },
  actions: {
    getCitiesByState: async ({ commit }, codeState) => {
      try {
        const { data } = await httpRequest.getRequest(
          `${BASE_URL}/${codeState}/cities`,
        );

        commit('SET_CITIES_STATE', data);

        console.log('city', data);
      } catch (error) {
        return { success: false };
      }
    },

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
        commit('SET_REGIONS', data);
      } catch (error) {
        commit('SET_REGIONS', []);
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
