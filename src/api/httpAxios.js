import axios from 'axios';

// Configuration par défault pour 'l'instance axios
let config = {
    baseURL: 'http://localhost:1337'
};

// création d'une instance 
const httpAxios = axios.create(config);

// Intercepteur de requete pour la logique d'authentification 
const authRequestInterceptor = config => {
    // ici on place le jeton d'authentification en en-tête
    return config;
}

// Intercepteur de requete pour logger la requete
const loggerRequestInterceptor = config => {
    // On place ici la logique d'enregistrement
    return config;
}

// Ajout des intercepteurs de requete à l'instance 

httpAxios.interceptors.request.use(authRequestInterceptor);
httpAxios.interceptors.request.use(loggerRequestInterceptor);

//Intercepteeur de rééponse pour gérer les erreurs d'authentification 
const authResponseInterceptor = (response => {
    // placer ici la logique de gestion des codes d'erreurs
    return response;
}, error => {
    //placer ici la logique des erreurs levées
    return Promise.reject(error);
});

//Intercepteur de réponse pour logger la réponse 
const loggerResponseInterceptor = response => {
    // placer ici la logique d'enregistrement 
    return response;
}

// Ajout des intercepteurs de réponse à l'instance
httpAxios.interceptors.response.use(authResponseInterceptor);
httpAxios.interceptors.response.use(loggerResponseInterceptor);

// export { httpClient };

