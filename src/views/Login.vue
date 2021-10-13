<template>
  <div class="fill-height">
    <v-card elevation="0">
      <v-card-text>
        <v-row justify="center" class="mt-5">
          <v-col cols="12" sm="6" md="4" xl="2" lg="3">
            <v-row class="d-flex justify-space-around flex-column">
              <p class="subtitle font-weight-bold mx-auto">
                Ingresa con tu usuario
              </p>
              <v-text-field
                v-model="credentials.rut"
                dense
                outlined
                type="text"
                label="Rut"
                class="mb-3 mt-6"
              ></v-text-field>
              <v-text-field
                v-model="credentials.password"
                dense
                class="mb-3"
                outlined
                type="password"
                label="Contraseña"
              ></v-text-field>
              <v-btn
                @click="handleLogin"
                rounded
                color="primary"
                block
                id="sendButton"
                class="mb-6"
                >Ingresar</v-btn
              >
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-footer color="white" fixed padless>
      <v-row justify="center" no-gutters>
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          :src="logoCerpo"
          transition="scale-transition"
          width="250"
        />
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          :src="logoHospitalDigital"
          transition="scale-transition"
          width="200"
        />
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          :src="logoUniversidadChile"
          transition="scale-transition"
          width="30"
        />
        <v-col class="py-4 text-center text-body-2" cols="12">
          Software Desarrollado por Cerpo, Facultad de Medicina, Universidad de
          Chile.
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
import logoCerpo from '../assets/Logo_cerpo.png';
import logoHospitalDigital from '../assets/Logo_HD_gob.png';
import logoUniversidadChile from '../assets/Logo_u_de_chile.png';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Login',

  data: () => ({
    logoCerpo,
    logoHospitalDigital,
    logoUniversidadChile,
    icons: ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram'],
    credentials: {
      rut: '15654738-7',
      password: 'admin',
    },
  }),

  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
  },

  methods: {
    ...mapActions({
      login: 'auth/login',
      attempt: 'auth/attempt',
    }),

    async handleLogin() {
      const { accessToken } = await this.login(this.credentials);

      if (accessToken) {
        let { success } = await this.attempt(accessToken);

        if (!success) {
          await this.$router.push({ path: '/login' });
        }
        await this.$router.replace({ path: '/my/casos' });
      }
    },
  },
};
</script>

<style scoped></style>
