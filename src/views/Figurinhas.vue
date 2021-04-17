<template>
  <div>
    <v-container class="d-flex flex-row justify-center">
      <div>
        <v-text-field
          label="Nome da pessoa"
          :rules="rules"
          hide-details="auto"
          class="mr-4"
          v-model="novoNomePessoa"
        ></v-text-field>
        <v-btn class="mt-2" @click="renomear()">Renomear</v-btn>
      </div>
      <div>
        <v-text-field
          v-model="nomePersonagem"
          label="Novo personagem"
          :rules="rules"
          hide-details="auto"
          class="mr-4"
        ></v-text-field>
        <v-btn
          class="mt-2"
          @click="carregarPersonagem({ nomePersonagem, nomePessoa: $route.params.usuario })"
        >Adicionar</v-btn>
      </div>
      <div>
        <v-text-field
          v-model="buscaPersonagem"
          label="Buscar personagem"
          hide-details="auto"
          class="mr-4"
        ></v-text-field>
        <span>{{ buscaPersonagem !== "" ? `Buscando por: "${buscaPersonagem}"` : "" }}</span>
      </div>
    </v-container>
    <div class="divCartoes mt-6">
      <h1>Inventário de {{$route.params.usuario}}</h1>
    </div>
    <CartoesFigurinhas
      :nomePessoa="$route.params.usuario"
      :figurinhas="buscaFigurinhaPorNome($route.params.usuario, buscaPersonagem)"
    ></CartoesFigurinhas>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import CartoesFigurinhas from "@/components/CartoesFigurinhas";

export default {
  name: "Figurinhas",
  data() {
    return {
      novoNomePessoa: this.$route.params.usuario,
      nomePersonagem: "",
      buscaPersonagem: "",
      rules: [
        value => !!value || "Required.",
        value => (value && value.length >= 3) || "Min 3 characters"
      ]
    };
  },
  components: {
    CartoesFigurinhas
  },
  computed: mapGetters(["buscaFigurinhaPorNome"]),
  methods: {
    ...mapActions(["carregarPersonagem", "renomearPessoa"]),
    renomear() {
      this.renomearPessoa({
        nomePessoa: this.$route.params.usuario,
        novoNomePessoa: this.novoNomePessoa
      });
      this.$router.replace({
        name: "Figurinhas",
        params: { usuario: this.novoNomePessoa }
      });
    }
  }
};
</script>

<style scoped>
</style>