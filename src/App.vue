<template>
  <v-app>
    <v-app-bar app color="red lighten-2" dark>
      <router-link :to="{name: 'Pessoas'}" class="linkEditado">
        <v-tab>Pessoas</v-tab>
      </router-link>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  })
};
</script>
<style>
@import "estilo.css";
</style>
