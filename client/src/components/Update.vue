<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Formulario de edição</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <form v-on:submit.prevent="saveRegister()">
          <v-text-field
            v-model="user.name"
            label="Name"
            outlined
            required
          ></v-text-field>
          <v-text-field
            v-model="user.email"
            label="Email"
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
  name: "registreUpdate",
  mounted() {
    this.id = this.$route.params.id;
    console.log(this.$route);
    axios
      .get("http://localhost:3000/api/users?id=" + this.id)
      .then((r) => {
        this.user = r.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  data() {
    return {
      id: null,
      user: {
        name: "",
        email: "",
      },
    };
  },
  methods: {
    saveRegister() {
      var router = this.$router;
      axios
        .put("http://localhost:3000/api/users/" + this.id, {
          name: this.user.name,
          email: this.user.email,
        })
        .then(function () {
          router.push("/users");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>