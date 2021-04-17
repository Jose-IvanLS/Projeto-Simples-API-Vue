<template>
  <div>
    <v-container class="d-flex">
      <v-text-field v-model="nomePessoa" label="Nome da pessoa" :rules="rules" hide-details="auto"></v-text-field>
      <v-btn v-on:click="criarPessoa">Salvar</v-btn>
    </v-container>
    <div class="divCartoes">
      <div v-for="pessoa in getPessoas" :key="pessoa.nome">
        <router-link :to="{ name: 'Figurinhas', params: { usuario: pessoa.nome } }">
          <CartoesPessoas :nome="pessoa.nome" :quantidade="pessoa.figurinhas.length"></CartoesPessoas>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import { mapActions, mapGetters } from "vuex";
import CartoesPessoas from "@/components/CartoesPessoas.vue";

export default {
  name: "Pessoas",
  components: {
    CartoesPessoas
  },
  data() {
    return {
      nomePessoa: "",
      pessoas: [],
      rules: [
        value => !!value || "Required.",
        value => (value && value.length >= 3) || "Min 3 characters"
      ]
    };
  },
  methods: {
    ...mapActions(["adicionarPessoa"]),
    criarPessoa() {
      console.log("Pokemon", this.nomePessoa);
      if (this.nomePessoa.length >= 3) {
        this.adicionarPessoa(this.nomePessoa);
        this.$router.push({
          name: "Figurinhas",
          params: { usuario: this.nomePessoa }
        });
      }
      //console.log(this.$store.state.pessoas)
    }
  },
  computed: mapGetters(["getPessoas"])
};
</script>