<template>
  <v-container fluid>
    <v-row>
      <v-col cols="2">
        <v-sheet rounded="lg">
          <v-list color="transparent">
            <v-list-item-group>
              <v-list-item
                :to="{ name: link.link }"
                v-for="link in navigationLinks"
                :key="link.name"
                link
                active-class="active"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    {{ link.name }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-sheet>
      </v-col>

      <v-col>
        <v-sheet min-height="70vh" class="fill-height pa-3" rounded="lg">
          <router-view />
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Index',

  data: () => ({
    navigationLinks: [
      {
        name: 'Usuarios',
        link: 'Users',
      },
      {
        name: 'Comunas',
        link: 'Communes',
      },
      {
        name: 'Regiones',
        link: 'Regions',
      },
      {
        name: 'Resultado comité',
        link: 'CommitteeResult',
      },
      {
        name: 'Vías parto',
        link: 'DeliveryRoute',
      },
      {
        name: 'Decisión paciente',
        link: 'PatientDecision',
      },
      {
        name: 'Establecimientos',
        link: 'Organization',
      },
      {
        name: 'Estado casos',
        link: 'StatusCase',
      },
      {
        name: 'Sistemas',
        link: 'System',
      },
    ],
  }),
};
</script>

<style scoped>
.active {
  background-color: #568f99;
  color: #fff !important;
}
</style>
