
<template>
    <v-content>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="8" md="4">
                    <v-card class="elevation-12">

                        <v-toolbar color="primary" dark flat>
                            <v-toolbar-title>Login </v-toolbar-title>
                            <v-spacer />
                            <v-toolbar-title>
                            <router-link to="/signup" class="a float-right">
                                    Vai al SignUp
                            </router-link>
                            </v-toolbar-title>
                            <v-spacer />
                        </v-toolbar>

                        <v-card-text>
                            <v-form>
                                
                                <v-text-field name="login"  type="text" v-model="email"
                                    label="E-mail" required />

                                <v-text-field id="password" name="password" :counter="25"
                                    label="Password" v-model="password" type="password" class="input" required />
                            </v-form>
                        </v-card-text>


                        <v-card-actions>
                            <v-spacer />
                            <v-btn color="primary" v-on:click="login">Login</v-btn>
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
    import firebase from 'firebase';
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

                    user = firebase.auth().currentUser;
                    if (user.uid == "YWcgAgaqOBWEd7AuOJyRAwh3SkK2") {
                        this.$router.replace('Admin');
                    } else {
                        this.$router.replace('Calendar');
                    }
                }).catch((err) => {
                    alert(err.message)
                })
            },
            reset() {
                this.$refs.form.reset()
            }
        }
    }
</script>