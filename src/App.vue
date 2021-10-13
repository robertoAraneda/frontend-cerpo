<template>
  <v-app>
    <v-app-bar
      height="100"
      elevation="1"
      app
      color="white"
      dark
      class="align-center"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          :src="logoAcm"
          width="230"
        />
        <v-spacer></v-spacer>
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          :src="logoPichipu"
          transition="scale-transition"
          width="160"
        />
      </div>

      <v-spacer></v-spacer>

      <v-img
        alt="Vuetify Name"
        class="shrink mt-1 hidden-sm-and-down"
        contain
        :src="logoMinisterioSalud"
        width="60"
      />
    </v-app-bar>

    <v-main class="grey lighten-3">
      <div v-if="loadingUser" class="pa-4 text-center">
        <h3 class="text-h6 font-weight-light mb-2">Bienvenido a PICHIPU</h3>
        <p class="text-caption">Verificando información de usuario</p>
        <v-progress-circular
          indeterminate
          color="primary"
          size="36"
        ></v-progress-circular>
      </div>
      <router-view v-else />
    </v-main>
  </v-app>
</template>

<script>
import logoAcm from '../src/assets/Logo_ACM.svg';
import logoPichipu from '../src/assets/LogoPICHIPU.svg';
import logoMinisterioSalud from '../src/assets/Logo_minsal_gris.svg';
import { mapGetters } from 'vuex';

export default {
  name: 'App',

  data: () => ({
    logoAcm: logoAcm,
    logoPichipu: logoPichipu,
    logoMinisterioSalud: logoMinisterioSalud,
    loadingUser: false,
  }),

  watch: {
    async user(value) {
      if (value) {
        this.loadingUser = false;
      }
    },
  },

  mounted() {
    this.loadingUser = true;
    setTimeout(() => {
      if (!this.user) {
        this.loadingUser = false;
      }
    }, 5000);
  },

  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
  },
};
</script>
