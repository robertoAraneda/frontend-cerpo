<template>
  <div>
    <v-toolbar height="40" color="grey lighten-2" elevation="0" outlined dark>
      <v-spacer></v-spacer>
      <v-toolbar-items
        ><span class="text--primary mt-2"
          >Bienvenido: Roberto Araneda, Hospital Digital</span
        ></v-toolbar-items
      >
      <v-spacer></v-spacer>
      <v-btn color="primary" x-small fab>
        <v-icon dark>mdi-export</v-icon>
      </v-btn>
    </v-toolbar>
    <v-toolbar color="primary" elevation="1" dark>
      <div class="mr-2" v-for="link in links" :key="link.name">
        <v-btn link :to="{ name: link.url }" text>
          {{ link.name }}
        </v-btn>
      </div>

      <v-spacer></v-spacer>
    </v-toolbar>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Index',

  data: () => ({
    links: [
      {
        name: 'Casos',
        url: 'Cases',
      },
      {
        name: 'Agenda',
        url: 'Schedules',
      },
      {
        name: 'Configuración',
        url: 'Settings',
      },
      {
        name: 'Reportes',
        url: 'Reports',
      },
    ],
  }),

  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
  },
};
</script>

<style scoped></style>
