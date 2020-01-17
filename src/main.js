import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueTextareaAutosize from 'vue-textarea-autosize';
import firebase from 'firebase/app';
import 'firebase/firestore';
import VueRouter from 'vue-router'
import router from './router'
import { firestorePlugin } from 'vuefire'
import feather from 'vue-icon'

Vue.use(firestorePlugin)
Vue.use(VueRouter)
Vue.use(VueTextareaAutosize)
Vue.use(feather,'v-icon')
Vue.config.productionTip = false

//ANCHOR credenziali  firebase applicazione 
firebase.initializeApp({
  apiKey: "AIzaSyCBPZMZIHsk4vnKglQBTcSD7QjkJtjOZ20",
    authDomain: "best-world-f594a.firebaseapp.com",
    databaseURL: "https://best-world-f594a.firebaseio.com",
    projectId: "best-world-f594a",
    storageBucket: "best-world-f594a.appspot.com",
    messagingSenderId: "149268880933",
    appId: "1:149268880933:web:34640bdd316c760a8d69cc"

});


//ANCHOR riferimento generale al database
export const db = firebase.firestore();
new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')