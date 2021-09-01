<template>

    <v-app id="app"> 
        <v-app-bar app class="secondary">
            <v-toolbar-title class="nav-bar--title">STAPI APP</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
              hide-details
              solo
              dense
              placeholder="Rechercher"
              append-icon="mdi-magnify"
              v-model="search"></v-text-field>
        </v-app-bar>

        <v-main class="blue lighten-2">
            <ErrorAlert>
              <ProductList :search="search"></ProductList>
            </ErrorAlert>
        </v-main>
    </v-app>
   
</template>


<script>
import ProductList from "@/components/ProductList"; // j'importe le composant depuis le dossier components
import ErrorAlert from "@/components/utils/ErrorAlert"


export default {
  name: 'App',

  components: { // j'apelle le composant ProductList
    ErrorAlert,
    ProductList
  },

  data: () => ({
    search: ""
  }),
};
</script>

<style scoped>
.navbar--title {
  color: white;
}
</style>