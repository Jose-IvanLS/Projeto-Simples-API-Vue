<template>
  <v-card max-width="344" outlined class="mt-4 ml-4">
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">{{nome}}</v-list-item-title>
        <v-list-item-subtitle>Quantidade de figurinhas: {{quantidade}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <v-btn class="mx-auto" v-on:click.prevent="remover">Remover</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Pessoas",
  methods: {
    ...mapActions(["removerPessoa"]),
    remover() {
      this.removerPessoa(this.nome);
    }
  },
  props: {
    nome: String,
    quantidade: Number
  }
};
</script>
