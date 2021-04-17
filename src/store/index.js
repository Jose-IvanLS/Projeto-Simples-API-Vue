import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import axios from 'axios'

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default new Vuex.Store({
  state: {
    pessoas: [],
    nomePersonagem: ''
  },
  mutations: {
    adicionarPessoa(state, nome) {
      state.pessoas.push({ nome, figurinhas: [] });
    },
    removerPessoa(state, nome) {
      state.pessoas = state.pessoas.filter(pessoa => pessoa.nome !== nome);
    },
    adicionarFigurinha(state, { nomePessoa, nomePersonagem, nivelPersonagem, mundoPersonagem, vocacaoPersonagem }) {
      const pessoaEncontrada = state.pessoas.find(pessoa => pessoa.nome === nomePessoa);
      if (!pessoaEncontrada) {
        console.log('Usuário não encontrado ao adicionar figurinha');
        return;
      }
      pessoaEncontrada.figurinhas.push({
        id: Math.floor(Math.random() * 1000000) + 1,
        nomePersonagem,
        nivelPersonagem,
        mundoPersonagem,
        vocacaoPersonagem
      });
    },
    removerFigurinha(state, { nomePessoa, id }) {
      const indice = state.pessoas.findIndex(pessoa => pessoa.nome === nomePessoa);
      if (indice < 0) {
        return;
      }
      state.pessoas[indice].figurinhas = state.pessoas[indice].figurinhas.filter(figurinha => figurinha.id !== id);
    },
    renomearPessoa(state, { nomePessoa, novoNomePessoa }) {
      const indice = state.pessoas.findIndex(pessoa => pessoa.nome === nomePessoa);
      if (indice < 0) {
        return;
      }
      state.pessoas[indice] = {
        ...state.pessoas[indice],
        nome: novoNomePessoa
      }
    }
  },
  getters: {
    getPessoas: state => state.pessoas,
    getPessoa: state => nomePessoa => state.pessoas.find(pessoa => pessoa.nome === nomePessoa),
    buscaFigurinhaPorNome: state => (nomePessoa, nomeFigurinha = "") => {
      if (nomeFigurinha !== "") {
        return state.pessoas
          .find(pessoa => pessoa.nome === nomePessoa)
          .figurinhas
          .filter(f => f.nomePersonagem.indexOf(nomeFigurinha) >= 0);
      }
      return state.pessoas.find(pessoa => pessoa.nome === nomePessoa).figurinhas;
    }
  },
  actions: {
    adicionarPessoa({ commit }, payload) {
      commit('adicionarPessoa', payload);
    },
    removerPessoa({ commit }, payload) {
      commit('removerPessoa', payload);
    },
    adicionarFigurinha({ commit }, payload) {
      commit('adicionarFigurinha', payload);
    },
    removerFigurinha({ commit }, payload) {
      commit('removerFigurinha', payload);
    },
    carregarPersonagem({ commit }, { nomePersonagem, nomePessoa }) {
      axios
        .get(`https://api.tibiadata.com/v2/characters/${nomePersonagem}.json`)
        .then(dados => {
          console.log(dados.data)
          let nomePersonagem = dados.data.characters.data.name;
          let mundoPersonagem = dados.data.characters.data.world;
          let nivelPersonagem = dados.data.characters.data.level;
          let vocacaoPersonagem = dados.data.characters.data.vocation;
          commit('adicionarFigurinha', { nomePersonagem, mundoPersonagem, nivelPersonagem, vocacaoPersonagem, nomePessoa });
        })
        .catch(error => console.log(error));
    },
    renomearPessoa({ commit }, payload) {
      commit('renomearPessoa', payload);
    }
  },
  plugins: [vuexLocal.plugin]
})