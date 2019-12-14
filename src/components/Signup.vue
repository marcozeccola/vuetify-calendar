<template>

    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
        <v-btn color="warning">
            <router-link to="/login" class="a">
                vai al Login
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

        <v-btn color="warning" v-on:click="signUp">
            Sign up
        </v-btn>

    </v-form>
</template>
<script>

  import firebase from 'firebase';
  export default{
    name: 'signup',
    
    data () {
    
    return {
    email: '',
    password: '',
    valid: true,
    pass: '',
    //validità password
    passRules: [
        //è inserita
        v => !!v || 'Password è obbligatoria',
        //lunghezza psw e presenza caratteri corretti
        v =>  ((v.search('1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','p','q','r','s','t','u','v','w','x','y','z'))>=0)|| 'deve contenere numeri e lettere',
        v => (v.length > 6) || 'La password deve essere almeno di 6 caratteri',
    ],
    //validita' mail
    emailRules: [
        //è inserita
        v => !!v || 'E-mail è richiesta',
        //controllo sintassi email
        v => /.+@.+\..+/.test(v) || 'E-mail deve essere valida',
    ],
}
    },
    methods: {
      signUp() {
        
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((user) => {
            user = firebase.auth().currentUser;
            alert(`ciao ${user.email}`);
            this.$router.replace('/login');

     }).catch((err) => {
         alert(err.message)
     });
      },
     validate(){
         if (this.$refs.form.validate()) {
             this.snackbar = true
         }
     },
     reset(){
         this.$refs.form.reset()
     }
 
    }
  }
</script>