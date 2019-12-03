<template>
    <form >
    <div class="login">
        <input type="text" v-model="email" placeholder="Email address" class="input" required>
        <br />
        <input type="password" v-model="password" placeholder="Password" class="input" required>
        <br />
        <button  v-on:click="login">submit
        </button>
        <p>
            <router-link to="/signup">
                Crea account
            </router-link>
        </p>
    </div>
    </form>
</template>
<script >
import firebase from 'firebase'
export default {
    name: 'login',
    data: function () {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login() {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user) => {
                
                alert(`ciao ${user}`);
                this.$router.replace('Calendar');
            }).catch((err) => {
                alert(err.message)
            })
        }
    }}
 </script>