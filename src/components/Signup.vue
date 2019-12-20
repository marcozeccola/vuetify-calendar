
<template>
    <v-content>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="8" md="4">
                    <v-card class="elevation-12">

                        <v-toolbar color="primary" dark flat>
                            <v-toolbar-title>SignUp </v-toolbar-title>
                            <v-spacer />
                            <v-toolbar-title>
                            <router-link to="/login" class="a float-right">
                                    Vai al Login
                            </router-link>
                            </v-toolbar-title>
                            <v-spacer />
                        </v-toolbar>

                        <v-card-text>
                            <v-form>
                                
                                <v-text-field name="login"  :rules="emailRules" type="text" v-model="email"
                                    label="E-mail" required />

                                <v-text-field :rules="passRules" id="password" name="password" :counter="25"
                                    label="Password" v-model="password" type="password" class="input" required />
                                    
                            </v-form>
                        </v-card-text>


                        <v-card-actions>
                            <v-spacer />
                            <v-btn color="primary" v-on:click="signUp"> SignUp</v-btn>
                            <v-spacer />
                            <v-btn color="error" class="mr-4" @click="reset">Reset</v-btn>
                        </v-card-actions>

                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-content>
</template>
<script>

    import { db } from '@/main';
    import firebase from 'firebase';
    export default{
    name: 'signup',
    
    data () {
    
    return {
    email: '',
    password: '',
    valid: false,
    pass: '',
    //validità password
    passRules: [
        //è inserita
        v => !!v || 'Password è obbligatoria',
        //lunghezza psw e presenza caratteri corretti
        v =>  ((v.search('1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','p','q','r','s','t','u','v','w','x','y','z'))>=0)|| 'deve contenere numeri e lettere (non solo maiuscole)',
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
                db.collection('uids').add({
                    uid: user.uid,
                    email:user.email
                });
                db.collection('eventi').add({
                    id: user.uid,
                    name : "Natale",
                    type :"Special",
                    details: null,
                    start : "2019-12-25 00:00",
                    end: "2019-12-25 23:55",
                    color :"#AD2121"
                });
                db.collection('eventi').add({
                    id: user.uid,
                    type :"Special",
                    name : "Natale",
                    details: null,
                    start : "2020-12-25 00:00",
                    end: "2020-12-25 23:55",
                    color :"#AD2121"
                });
                db.collection('eventi').add({
                    id: user.uid,
                    type :"Special",
                    name : "Natale",
                    details: null,
                    start : "2021-12-25 00:00",
                    end: "2021-12-25 23:55",
                    color :"#AD2121"
                });
                db.collection('eventi').add({
                    id: user.uid,
                    type :"Special",
                    name : "Natale",
                    details: null,
                    start : "2022-12-25 00:00",
                    end: "2022-12-25 23:55",
                    color :"#AD2121"
                });
                db.collection('eventi').add({
                    id: user.uid,
                    type :"Special",
                    name : "Natale",
                    details: null,
                    start : "2023-12-25 00:00",
                    end: "2023-12-25 23:55",
                    color :"#AD2121"
                });
                db.collection('eventi').add({
                    id: user.uid,
                    type :"Special",
                    name : "Natale",
                    details: null,
                    start : "2024-12-25 00:00",
                    end: "2024-12-25 23:55",
                    color :"#AD2121"
                });
                db.collection('eventi').add({
                    id: user.uid,
                    type :"Special",
                    name : "Natale",
                    details: null,
                    start : "2025-12-25 00:00",
                    end: "2025-12-25 23:55",
                    color :"#AD2121"
                });

                db.collection('eventi').add({
                    id: user.uid,
                    type :"Special",
                    name : "Capodanno",
                    details: "AUGURI! Capodanno 2020",
                    start : "2020-01-01 00:00",
                    end: "2020-01-01 23:55",
                    color :"#AD2121"
                });
                db.collection('eventi').add({
                    id: user.uid,
                    type :"Special",
                    name : "Capodanno",
                    details: "AUGURI! Capodanno 2021",
                    start : "2021-01-01 00:00",
                    end: "2021-01-01 23:55",
                    color :"#AD2121"
                });
                db.collection('eventi').add({
                    id: user.uid,
                    type :"Special",
                    name : "Capodanno",
                    details: "AUGURI! Capodanno 2022",
                    start : "2022-01-01 00:00",
                    end: "2022-01-01 23:55",
                    color :"#AD2121"
                });
                db.collection('eventi').add({
                    id: user.uid,
                    type :"Special",
                    name : "Capodanno",
                    details: "AUGURI! Capodanno 2023",
                    start : "2023-01-01 00:00",
                    end: "2023-01-01 23:55",
                    color :"#AD2121"
                });
                db.collection('eventi').add({
                    id: user.uid,
                    type :"Special",
                    name : "Capodanno",
                    details: "AUGURI! Capodanno 2024",
                    start : "2024-01-01 00:00",
                    end: "2024-01-01 23:55",
                    color :"#AD2121"
                });
                db.collection('eventi').add({
                    id: user.uid,
                    type :"Special",
                    name : "Capodanno",
                    details: "AUGURI! Capodanno 2025",
                    start : "2025-01-01 00:00",
                    end: "2025-01-01 23:55",
                    color :"#AD2121"
                });


                db.collection('eventi').add({
                    id: user.uid,
                    type :"Special",
                    name : "Pascqua",
                    details: null,
                    start : "2020-04-12 00:00",
                    end: "2020-04-12 23:55",
                    color :"#AD2121"
                });
                db.collection('eventi').add({
                    id: user.uid,
                    type :"Special",
                    name : "Pascqua",
                    details: null,
                    start : "2021-04-04 00:00",
                    end: "2021-04-04 23:55",
                    color :"#AD2121"
                });
                db.collection('eventi').add({
                    id: user.uid,
                    type :"Special",
                    name : "Pascqua",
                    details: null,
                    start : "2022-04-17 00:00",
                    end: "2022-04-17 23:55",
                    color :"#AD2121"
                });
                db.collection('eventi').add({
                    id: user.uid,
                    type :"Special",
                    name : "Pascqua",
                    details: null,
                    start : "2023-04-09 00:00",
                    end: "2023-04-09 23:55",
                    color :"#AD2121"
                });
                db.collection('eventi').add({
                    id: user.uid,
                    type :"Special",
                    name : "Pascqua",
                    details: null,
                    start : "2024-03-31 00:00",
                    end: "2024-03-31 23:55",
                    color :"#AD2121"
                });
                db.collection('eventi').add({
                    id: user.uid,
                    type :"Special",
                    name : "Pascqua",
                    details: null,
                    start : "2025-04-20 00:00",
                    end: "2025-04-20 23:55",
                    color :"#AD2121"
                });

                db.collection('eventi').add({
                    id: user.uid,
                    type :"Special",
                    name : "Ferragosto",
                    details: null,
                    start : "2020-08-15 00:00",
                    end: "2020-08-15 23:55",
                    color :"#AD2121"
                });
                db.collection('eventi').add({
                    id: user.uid,
                    type :"Special",
                    name : "Ferragosto",
                    details: null,
                    start : "2021-08-15 00:00",
                    end: "2021-08-15 23:55",
                    color :"#AD2121"
                });
                db.collection('eventi').add({
                    id: user.uid,
                    type :"Special",
                    name : "Ferragosto",
                    details: null,
                    start : "2022-08-15 00:00",
                    end: "2022-08-15 23:55",
                    color :"#AD2121"
                });
                db.collection('eventi').add({
                    id: user.uid,
                    type :"Special",
                    name : "Ferragosto",
                    details: null,
                    start : "2023-08-15 00:00",
                    end: "2023-08-15 23:55",
                    color :"#AD2121"
                });
                db.collection('eventi').add({
                    id: user.uid,
                    type :"Special",
                    name : "Ferragosto",
                    details: null,
                    start : "2024-08-15 00:00",
                    end: "2024-08-15 23:55",
                    color :"#AD2121"
                });
                db.collection('eventi').add({
                    id: user.uid,
                    type :"Special",
                    name : "Ferragosto",
                    details: null,
                    start : "2025-08-15 00:00",
                    end: "2025-08-15 23:55",
                    color :"#AD2121"
                });


            alert(`ciao ${user.email}`);
            this.$router.replace('/login');

     }).catch((err) => {
         alert(err.message)
     });
      },
     reset(){
         this.$refs.form.reset()
     }
 
    }
  }
</script>