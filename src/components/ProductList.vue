<template>
    <v-container>
        <v-row>
            <v-col cols="3">
                <v-select
                    v-model="category"
                    :items="categories"
                    label="Catégorie"
                    solo 
                >
                </v-select>
            </v-col>
            <v-col cols="9" class="text-end">
                <v-btn-toggle v-show="search.length === 0">
                    <v-btn v-if="page != 1" @click="page--">Préc.</v-btn>
                    <v-btn @click="page = 1">{{ page }} / {{ nbPages }}</v-btn>
                    <v-btn v-if="page != nbPages" @click="page++">Suiv.</v-btn>
                </v-btn-toggle>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-card class="ma-2" 
            v-for="(product, index) in products"
            :key="index"
            max-width="270"
            >
                <v-img
                    height="270"
                    :src="apiUrl + product.photo.url"
                ></v-img>
                <v-card-title>{{ product.name }}</v-card-title>
                <v-card-text>
                    <p> {{product.unit_price }} </p>
                </v-card-text>
            </v-card>
        </v-row>
    </v-container>
   
</template>
<script>

import http from "@/api/http"
import { debounce} from "lodash-es"

export default {
    name: "ProductList",
    props: {
        search: {
            type: String,
            default: ""
        }
    },
    data: () => ({
        apiUrl: process.env.VUE_APP_STRAPI_API, // je stocke l'adresse de l'api dans une variable environnement
        products: [],
        categories: [],
        category: null,
        page: 1,
        perPage: 10,
        nbPages: ""
    }),
    async created() { // fonction asynchrone pour aller chercher les produits sous format json
        
        this.products = await this.getProducts(0);
        console.log(this.products);
        const categories = await this.getCategories();
        const total = await this.getProductsCount();
        this.initCategories(categories, total);
        // getProductsDebounced : debounce(
        //     async function(start) {
        //     this.products = await this.getProducts(start);
        //     },
        //     200
        // )
    },
    methods: {
        async getProducts(start) {

            let uri = `/products?_start=${start}&_limit=${this.perPage}`;

            if (this.category) {
                uri += "&category" + this.category;
            }
            if (this.search.length > 0) {
                uri += "&name_contains=" + this.search;
            }

            return await http.callURI(uri);
        },
        async getCategories() {
           return await http.callURI(`/categories`);
        },
        async getProductsCount() {
            try {
                return await http.callURI(`/products/count`);
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        initCategories(categories, total) {
            console.log(categories);
            this.categories.push({
                text: "Toutes catégories",
                value: 0,
                nbProducts: total
            });

            categories.forEach(categorie => {
                console.log(categorie);
                this.categories.push({
                    text: categorie.name,
                    value: categorie.id,
                    nbProducts: categorie.products.length
                });
            });
        }
    }, 
    Computed: {
        nbPages() {
            if (this.categories.length > 0) { 
                console.log(this.categories.length);  
                const selectedCategory = this.categories.filter(category => {
                    return category.value === this.category
                });

                return Math.ceil(( selectedCategory[0].nbProducts / this.perPage))
            }
            
        }
    },
    watch: {
        async page(newVal) {
            const start = (newVal - 1) * this.perPage;
            this.products = await this.getProducts(start, this.perPage);
        },
        async category(newVal) {
            this.products = await this.getProducts(0, this.perPage, newVal);
        },
        async search() {
            this.products = await this.getProducts(0);
        },
        getProductsDebounced: debounce(
            async function(start) {
            return await this.getProducts(start)
        },
        300
        )
    }  
    // created() {
    //     fetch(`${this.apiUrl/products}`, {
    //         method: 'GET'
    //     })
    //     .then(response => response.json())
    //     .then(data => this.products = data);
    // },
    
}
</script>
<style>

</style>