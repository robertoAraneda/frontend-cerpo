import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import region from './modules/region';
import commune from './modules/commune';
import committeeResult from './modules/committee-result';
import deliveryRoute from './modules/delivery-route';
import patientDecision from './modules/patient-decision';
import organization from './modules/organization';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    region,
    commune,
    committeeResult,
    deliveryRoute,
    patientDecision,
    organization,
  },
});
