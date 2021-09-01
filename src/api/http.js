export default {
    backendUrl: process.env.VUE_APP_STRAPI_API,
    callURI: async function(uri, options = null) {
        try {
            let abortController = new AbortController();
            options = Object.assign(
                {},
                options,
                { signal: AbortController.signal }
            );

            // interrompt la requete au bout de 5 secondes
            setTimeout(() => {
                abortController.abort();
            }, 5000);
            
            const response = await fetch(this.backendUrl + uri, options);
            if (!response.ok) {
                throw new Error(`
                    appel API KO : ${this.backendUrl + uri}
                    Code ${response.status}
                `)
            }

            return await response.json();

        } catch (error) {

            console.error(error);
            return Promise.reject(new Error("Erreur de connexion à la source de données !"));
        }
    }
}