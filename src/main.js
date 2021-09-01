import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import AsyncComputed from 'vue-async-computed'


Vue.config.productionTip = false

Vue.use(AsyncComputed);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
