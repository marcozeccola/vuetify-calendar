<template>
    <div class="sign-up">
        
        <input v-model="email" type="text" class="input" placeholder="Email" required>
        <br>
        <input v-model="password" type="password" class="input" placeholder="Password" required>
        <br>
        <button v-on:click="signUp" class="button">Sign Up!</button>
        <button class="button">
            <router-link to="/login">
                Login
            </router-link>
        </button>
    </div>
</template>
<script>
  import firebase from 'firebase'
  export default {
    name: 'signup',
    data () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      signUp () {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((user) => {
        alert(`ciao ${user}`);
          this.$router.replace('/login')
        }).catch((err) => {
          alert(err.message)
        });
      }
    }
  }
</script>