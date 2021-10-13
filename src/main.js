import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

const token = localStorage.getItem('access_token');

if (token) {
  store.dispatch('auth/attempt', token).then(({ status }) => {
    if (status && status === 401) {
      window.location.replace('/login');
    }
  });
}

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
