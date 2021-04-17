<template>
  <div class="alinhamento">
    <div v-for="figurinha in figurinhas" :key="figurinha.id">
      <v-card max-width="344" outlined class="mt-4 ml-4">
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">{{figurinha.nomePersonagem}}</v-list-item-title>
            <v-list-item-subtitle>Vocação: {{figurinha.vocacaoPersonagem}}</v-list-item-subtitle>
            <v-list-item-subtitle>Nível: {{figurinha.nivelPersonagem}}</v-list-item-subtitle>
            <v-list-item-subtitle>Mundo: {{figurinha.mundoPersonagem}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-card-actions>
          <v-btn class="mx-auto" @click="removerFigurinha({ nomePessoa, id: figurinha.id })">Remover</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Figurinhas",
  data: () => ({}),
  props: {
    figurinhas: Array,
    nomePessoa: String
  },
  methods: {
    ...mapActions(["removerFigurinha"])
  }
};
</script>
<style scoped>
.alinhamento {
  display: flex;
}
</style>