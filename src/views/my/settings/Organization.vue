<template>
  <v-data-table
    :headers="headers"
    :items="organizations"
    sort-by="code"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Establecimientos</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="400px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="success" dark class="mb-2" v-bind="attrs" v-on="on">
              Nuevo
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Nombre"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-select
                      :items="types"
                      v-model="editedItem.type"
                      label="Tipo"
                      item-text="text"
                      item-value="id"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="editedItem.telecom"
                      label="Teléfono"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-checkbox
                      v-model="editedItem.active"
                      label="Activo"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="success darken-1" text @click="close">
                Cancelar
              </v-btn>
              <v-btn color="primary darken-1" depressed @click="save">
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h6"
              >¿Estás seguro que deseas eliminar este registro?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary darken-1" text @click="closeDelete"
                >Cancelar</v-btn
              >
              <v-btn color="primary darken-1" text @click="deleteItemConfirm"
                >Aceptar</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.type="{ item }">
      <span>{{ item.type[0].toUpperCase() + item.type.slice(1) }}</span>
    </template>
    <template v-slot:item.active="{ item }">
      <v-simple-checkbox disabled color="primary" :value="item.active" />
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <p class="subtitle-1">No hay registros.</p>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { OrganizationModel } from '../../../models/organization.model';
import headers from '../../../helpers/headers-datatable/organization.header';
import { OrganizationTypeEnum } from '../../../enums/organization-type.enum';

export default {
  name: 'Organization',

  data: () => ({
    headers,
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    editedItem: new OrganizationModel(),
    defaultItem: new OrganizationModel(),
  }),

  computed: {
    ...mapGetters({
      organizations: 'organization/organizations',
    }),

    formTitle() {
      return this.editedIndex === -1 ? 'Nuevo registro' : 'Editar registro';
    },

    types() {
      return Object.values(OrganizationTypeEnum).map((type) => ({
        text: type[0].toUpperCase() + type.slice(1),
        id: type,
      }));
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    ...mapActions({
      getOrganization: 'organization/getItems',
      store: 'organization/postItem',
      patch: 'organization/patchItem',
      remove: 'organization/deleteItem',
    }),
    initialize() {
      try {
        if (this.organizations.length === 0) this.getOrganization();
      } catch (e) {
        console.log('errot', e);
      }
    },

    editItem(item) {
      this.editedIndex = this.organizations.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.organizations.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.remove(this.editedItem);
      this.organizations.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      if (this.editedIndex > -1) {
        await this.patch(this.editedItem);
        Object.assign(this.organizations[this.editedIndex], this.editedItem);
      } else {
        const { data: organization } = await this.store(this.editedItem);

        this.organizations.push(organization);
      }
      this.close();
    },
  },
};
</script>

<style scoped></style>
