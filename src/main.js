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
  apiKey: "AIzaSyCP1-a2ZeiG-ofbPbhbbAOUm9yDBUq41Hk",
  authDomain: "vuetify-calendar-f0ad7.firebaseapp.com",
  databaseURL: "https://vuetify-calendar-f0ad7.firebaseio.com",
  projectId: "vuetify-calendar-f0ad7",
  storageBucket: "vuetify-calendar-f0ad7.appspot.com",
  messagingSenderId: "258412624133",
  appId: "1:258412624133:web:12a7ab68c321a5d2a21f6c"

});


//ANCHOR riferimento generale al database
export const db = firebase.firestore();
new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')