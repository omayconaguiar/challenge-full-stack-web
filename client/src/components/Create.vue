<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Formulario acadêmico</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <form v-on:submit.prevent="saveRegister()">
          <v-text-field
            v-model="user.academic_id"
            label="Registro Acadêmico"
            outlined
            required
          >
          </v-text-field>
          <v-text-field v-model="user.email" label="Email" outlined required>
          </v-text-field>
          <v-text-field
            v-model="user.name"
            label="Name"
            type="text"
            outlined
            required
          ></v-text-field>
          <v-text-field
            v-model="user.cpf"
            label="cpf"
            outlined
            required
          ></v-text-field>
          <v-card-actions>
            <v-btn color="warning" class="mr-4" type="submit">Salvar</v-btn>
          </v-card-actions>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  name: "registreCreate",
  data() {
    return {
      user: {
        academic_id: "",
        name: "",
        email: "",
        cpf: "",
      },
    };
  },
  methods: {
    saveRegister() {
      var router = this.$router;
      axios
        .post("http://localhost:3000/api/users", {
          academic_id: this.user.academic_id,
          name: this.user.name,
          email: this.user.email,
          cpf: this.user.cpf,
        })
        .then(() => {
          router.push("/users");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>