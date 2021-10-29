import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import { es, en } from 'vuetify/es5/locale';
import { Ripple, Scroll } from 'vuetify/lib/directives';

Vue.use(Vuetify, {
  directives: {
    Ripple,
    Scroll,
  },
});

const options = {
  lang: {
    locales: { es, en },
    current: 'es',
  },
  theme: {
    themes: {
      light: {
        primary: '#568f99', //'#027087'
        secondary: '#628390',
        red: '#AC1315', //'#AC1315' '#BA2E38'
        white: '#fff',
        white_: '#F2F2F2',
        black: '#262223',
      },
    },
  },
};

export default new Vuetify(options);
