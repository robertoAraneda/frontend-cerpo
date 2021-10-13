<template>
  <v-data-table
    :headers="headers"
    :items="statusCases"
    sort-by="code"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Estado casos</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
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
                    <v-text-field
                      v-model="editedItem.description"
                      label="Descripción"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <div class="d-flex">
                      <v-text-field
                        v-model="editedItem.color"
                        label="Color"
                        persistent-hint
                        hint="El formato del color es hexadecimal (#F0F8FF)"
                      ></v-text-field>
                      <v-sheet
                        class="mt-2 ml-4"
                        outlined
                        rounded="lg"
                        width="50"
                        height="40"
                        :color="editedItem.color"
                      ></v-sheet>
                    </div>
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
    <template v-slot:item.color="{ item }">
      <v-avatar :color="item.color" size="24"></v-avatar>
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
import { StatusCaseModel } from '../../../models/status-case.model';
import headers from '../../../helpers/headers-datatable/status-case.header';
import { SnackbarColorEnum } from '../../../enums/snackbar-color.enum';

export default {
  name: 'StatusCase',

  data: () => ({
    headers,
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    editedItem: new StatusCaseModel(),
    defaultItem: new StatusCaseModel(),
  }),

  computed: {
    ...mapGetters({
      statusCases: 'statusCase/statusCases',
    }),

    formTitle() {
      return this.editedIndex === -1 ? 'Nuevo registro' : 'Editar registro';
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
      getStatusCases: 'statusCase/getItems',
      store: 'statusCase/postItem',
      patch: 'statusCase/patchItem',
      remove: 'statusCase/deleteItem',
    }),

    handleSnackbar(props) {
      this.$emit('updateSnackbar', props);
    },

    initialize() {
      if (this.statusCases.length === 0) this.getStatusCases();
    },

    editItem(item) {
      this.editedIndex = this.statusCases.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.statusCases.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.remove(this.editedItem);
      this.statusCases.splice(this.editedIndex, 1);
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
        Object.assign(this.statusCases[this.editedIndex], this.editedItem);
      } else {
        const { data, status } = await this.store(this.editedItem);

        if (status === 201) {
          this.statusCases.push(data);
        } else {
          this.handleSnackbar({
            message: data.message,
            color: SnackbarColorEnum.ERROR,
          });
        }
      }
      this.close();
    },
  },
};
</script>

<style scoped></style>
