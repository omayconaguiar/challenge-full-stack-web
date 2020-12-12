import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import VueRouter from 'vue-router';

import home from './components/Home';
import getAll from './components/GetAll';
import registreCreate from './components/Create';
import registreUpdate from './components/Update';
import contact from './components/Contact';

Vue.component('home', home);
Vue.component('getAll', getAll);
Vue.component('registreCreate', registreCreate);
Vue.component('registreUpdate', registreUpdate);
Vue.component('contact', contact);

Vue.use(VueRouter);

const routes = [
  {path:'/', component:home},
  {path:'/home',component:home},
  {path:'/users', component:getAll},
  {path:'/create', component:registreCreate, name:'registreCreate'},
  {path:'/update/:id', component:registreUpdate, name:'registreUpdate'},
  {path:'/contact',component:contact},
  {path:'/network',component:contact}
]

const router = new VueRouter({
  routes,
  mode:'history'
})

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
