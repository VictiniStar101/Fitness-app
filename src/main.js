import Vue from 'vue'
import App from './App.vue'
import vSelect from './components/Select.vue'

Vue.component('v-select', vSelect)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
