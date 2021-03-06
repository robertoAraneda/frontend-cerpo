import httpRequest from '../../services/http';

const BASE_URL = '/api/v1/patient-decisions';

export default {
  namespaced: true,
  state: {
    patientDecisions: [],
  },
  mutations: {
    SET_PATIENT_DECISIONS: (state, payload) => {
      state.patientDecisions = payload;
    },
  },
  getters: {
    patientDecisions: (state) => state.patientDecisions,
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
        commit('SET_PATIENT_DECISIONS', data);
      } catch (error) {
        commit('SET_PATIENT_DECISIONS', []);
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
