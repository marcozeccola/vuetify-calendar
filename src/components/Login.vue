<template>


    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
        <v-btn color="warning">
            <router-link to="/signup" class="a">
                vai al Signup
            </router-link>
        </v-btn>

        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>


        <v-text-field :counter="25" :rules="passRules" label="Password" v-model="password" type="password" class="input"
            required></v-text-field>
        <v-btn :disabled="!valid" color="success" class="mr-4">

        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset">
            Reset
        </v-btn>

        <v-btn color="warning" v-on:click="login">
            Log in
        </v-btn>

    </v-form>
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