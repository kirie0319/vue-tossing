import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


const config = {
  apiKey: "AIzaSyBeuALsS3FvAwc-ylZ1mZh5L8nue5OYhPk",
  authDomain: "vue-tossing-4d594.firebaseapp.com",
  projectId: "vue-tossing-4d594",
  storageBucket: "vue-tossing-4d594.appspot.com",
  messagingSenderId: "910536782217",
  appId: "1:910536782217:web:610058df362214eaaa7158",
  measurementId: "G-MVSGTSWRQY"
};
firebase.initializeApp(config)
export default firebase