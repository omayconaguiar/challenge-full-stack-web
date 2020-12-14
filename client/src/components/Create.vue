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
            type="number"
            v-model="user.academic_id"
            outlined
            label="Registro Acadêmico"
            :class="{
              'is-invalid': length || (submitted && $v.user.academic_id.$error),
            }"
          >
          </v-text-field>
          <div
            v-if="length || (submitted && $v.user.academic_id.$error)"
            class="invalid-feedback"
          >
            <span v-if="!$v.user.academic_id.required"
              >Registro Acadêmico é obrigatório</span
            >
            <span v-if="length"
              >Registro acadêmico deve ter exatamente 6 caracteres</span
            >
          </div>
          <v-text-field
            v-model="user.email"
            label="Email"
            outlined
            :class="{
              'is-invalid': submitted && $v.user.email.$error,
            }"
          >
          </v-text-field>
          <div
            v-if="submitted && $v.user.email.$error"
            class="invalid-feedback"
          >
            <span v-if="!$v.user.email.required">Email é obrigatório</span>
            <span v-if="!$v.user.email.email">Email está inválido</span>
          </div>
          <v-text-field
            v-model="user.name"
            label="Name"
            type="text"
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
            type="number"
            v-model="user.cpf"
            label="Cpf"
            outlined
            :class="{
              'is-invalid': show || (submitted && $v.user.cpf.$error),
            }"
          ></v-text-field>
          <div
            v-if="show || (submitted && $v.user.cpf.$error)"
            class="invalid-feedback"
          >
            <span v-if="!$v.user.cpf.required">Cpf é obrigatório</span>
            <span v-if="show">Cpf está invalido</span>
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

import { cpf } from "cpf-cnpj-validator";

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
      submitted: false,
      show: false,
      length: false,
    };
  },
  validations: {
    user: {
      academic_id: {
        required,
      },
      email: { required, email },
      name: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(40),
      },
      cpf: {
        required,
      },
    },
  },
  methods: {
    saveRegister() {
      var router = this.$router;
      this.submitted = true;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      if (!cpf.isValid(this.user.cpf)) {
        this.show = true;
        return;
      }
      if (this.user.academic_id.length != 6) {
        this.length = true;
        return;
      }

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
          if (
            error.response.data ===
            "Registro acadêmico já existente, tente o cadastro com um novo registro."
          ) {
            alert(
              "Registro acadêmico já existente, tente o cadastro com um novo registro."
            );
            return;
          }
          if (
            error.response.data ===
            "Email já existente, tente o cadastro com um novo email."
          ) {
            alert("Email já existente, tente o cadastro com um novo email");
            return;
          }
          if (
            error.response.data ===
            "Cpf já existente, tente o cadastro com um novo cpf."
          ) {
            alert("Cpf já existente, tente o cadastro com um novo cpf.");
            return;
          }
        });
    },
  },
};
</script>