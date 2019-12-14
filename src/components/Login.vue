<template>


    <v-form ref="form">
        <v-btn color="warning">
            <router-link to="/signup" class="a">
                vai al Signup
            </router-link>
        </v-btn>

        <v-text-field v-model="email"  label="E-mail" required></v-text-field>


        <v-text-field :counter="25"  label="Password" v-model="password" type="password" class="input"
            required></v-text-field>


        <v-btn color="error" class="mr-4" @click="reset">
            Reset
        </v-btn>

        <v-btn color="warning" v-on:click="login">
            Log in
        </v-btn>

    </v-form>
</template>
<script>
import firebase from 'firebase';
export default{
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
                
                user = firebase.auth().currentUser;
                
                alert(`ciao ${user.uid}`);
                this.$router.replace('Calendar');
            }).catch((err) => {
                alert(err.message)
            })
        },
        reset(){
         this.$refs.form.reset()
     }
    }}
 </script>