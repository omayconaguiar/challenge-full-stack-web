<template>
  <v-container>
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Procurar por nome"
        v-model="title"
        @input="searchTitle($event)"
      />
      <div class="input-group-append">
        <button
          class="btn btn-outline-secondary"
          type="button"
          @click="searchTitle"
        >
          Search
        </button>
      </div>
    </div>

    <v-row class="text-center">
      <v-col class="mb-4">
        <h2 class="display-2 font-weight-bold mb-3">Listar</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="mb-1">
        <v-btn
          :to="{ name: 'registreCreate' }"
          class="mx-2"
          fab
          dark
          color="indigo"
        >
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12">
        <v-simple-table fixed-header class="elevation-3">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">ID</th>
                <th class="text-center">Registro Acadêmico</th>
                <th class="text-center">Nome</th>
                <th class="text-center">Cpf</th>
                <th class="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.academic_id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.cpf }}</td>
                <td>
                  <v-btn
                    :to="{
                      name: 'registreUpdate',
                      params: { id: user.id },
                    }"
                    fab
                    small
                    color="primary"
                    ><v-icon>mdi-pencil</v-icon></v-btn
                  >
                  <v-btn
                    @click.stop="dialog = true"
                    @click="id = user.id"
                    fab
                    small
                    color="error"
                    ><v-icon>mdi-delete</v-icon></v-btn
                  >
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="350">
      <v-card>
        <v-card-title class="headline">Desea eliminar o registro?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false">Cancelar</v-btn>
          <v-btn @click="confirmarBorrado(id)" color="error">Aceitar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" color="success">
      {{ textsnack }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">Rejeitar</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  name: "getAll",
  mounted() {
    this.getAll();
  },
  data() {
    return {
      dialog: false,
      users: null,
      id: null,
      snackbar: false,
      textsnack: "Registro Eliminado!",
    };
  },
  methods: {
    getAll() {
      axios
        .get("http://localhost:3000/api/users")
        .then((r) => {
          this.users = r.data;
          console.log(this.users);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    confirmarBorrado(id) {
      axios
        .delete("http://localhost:3000/api/users/" + id)
        .then(() => {
          this.getAll();
          this.dialog = false;
          this.snackbar = true;
        })
        .catch(function (error) {
          alert(error);
        });
    },
    searchTitle() {
      axios
        .get(`http://localhost:3000/api/users?name=${this.title}`)
        .then((r) => {
          this.users = r.data;
          console.log(this.users);
          if (this.users.length === 0) {
            this.getAll();
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>