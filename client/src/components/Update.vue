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
            :class="{ 'is-invalid': submitted && $v.user.name.$error }"
          ></v-text-field>
          <div v-if="submitted && $v.user.name.$error" class="invalid-feedback">
            <span v-if="!$v.user.name.required">Nome é obrigatório</span>
            <span v-if="!$v.user.name.minLength"
              >Nome deve ter no mínimo 4 caracteres</span
            >
            <span v-if="!$v.user.name.maxLength"
              >Nome deve ter no máximo 20 caracteres</span
            >
          </div>
          <v-text-field
            v-model="user.email"
            label="Email"
            outlined
            :class="{ 'is-invalid': submitted && $v.user.email.$error }"
          >
          </v-text-field>
          <div
            v-if="submitted && $v.user.email.$error"
            class="invalid-feedback"
          >
            <span v-if="!$v.user.email.required">Email é obrigatório</span>
            <span v-if="!$v.user.email.email">Email está inválido</span>
          </div>
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
import {
  required,
  minLength,
  email,
  maxLength,
} from "vuelidate/lib/validators";

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
      submitted: false,
    };
  },
  validations: {
    user: {
      email: { required, email },
      name: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(40),
      },
    },
  },
  methods: {
    saveRegister() {
      this.submitted = true;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
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
          if (
            error.response.data ===
            "Email já existente, tente o cadastro com um novo email."
          ) {
            alert("Email já existente, tente o cadastro com um novo email");
            return;
          }
        });
    },
  },
};
</script>