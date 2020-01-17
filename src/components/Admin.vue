<!--TODO log out-->
<template>
    <v-row class="fill-height">
        <v-col>
            <v-sheet height="64">
                <v-toolbar flat color="white">
                    <v-btn color="primary" dark @click.stop="dialog = true" data-app="true">
                        NUOVO EVENTO
                    </v-btn>
                </v-toolbar>
            </v-sheet>
            <v-sheet height="64">
                <v-toolbar flat color="white">
                    <v-btn color="primary" dark @click.prevent="tocalendar()" data-app="true">
                        CALENDARIO
                    </v-btn>
                </v-toolbar>
            </v-sheet>

            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">Uid</th>
                            <th class="text-left">E-Mail</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.uid">
                            <td>{{ user.uid }}</td>
                            <td>{{ user.email }}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>



            <v-dialog v-model="dialog" max-width="500">
                <v-card>
                    <v-container>
                        <v-form @submit.prevent="addEvent">
                            <v-text-field v-model="uid" type="text" label="UID"></v-text-field>
                            <v-text-field v-model="name" type="text" label="nome dell'evento"></v-text-field>
                            <v-text-field v-model="details" type="text" label="dettagli"></v-text-field>
                            <v-text-field v-model="start" type="date" label="inizio"></v-text-field>
                            <v-text-field v-model="starthour" type="time" label="inizio"></v-text-field>
                            <v-text-field v-model="end" type="date" label="fine"></v-text-field>
                            <v-text-field v-model="endhour" type="time" label="fine"></v-text-field>
                            <v-text-field v-model="color" type="color" label="colore(clicca per la palette)">
                            </v-text-field>
                            <v-btn type="submit" color="cyan accent-4" class="mr-4" @click.stop="dialog = false">
                                CREA EVENTO
                            </v-btn>
                        </v-form>
                    </v-container>
                </v-card>
            </v-dialog>


        </v-col>
    </v-row>
</template>

<script>
    import {
        db
    } from '@/main';
    //import firebase from 'firebase';
    export default {
        name: 'Admin',
        data: () => ({

            //ANCHOR settings dei vari campi
            uid: null,
            name: null,
            details: null,
            start: null,
            starthour: "00:00",
            endhour: "24:00",
            end: null,
            color: '#1976D2',
            currentlyEditing: null,
            //documents da firebase
            users: [],
            events: [],
            dialog: false,
            selectedEvent: {},
            selectedElement: null,
            selectedOpen: false,
            dialogDate: false
        }),
        mounted() {
            this.getusers();
        },
        computed: {
            title() {
                const {
                    start,
                    end
                } = this
                if (!start || !end) {
                    return ''
                }
                return '';
            },
        },
        methods: {
            //ANCHOR push delle collections nell'array users
            async getusers() {
                //con await per far terminare la chiamata asincrona, per fare in modo che la promise ritorni il risultato

                //let user = firebase.auth().currentUser;
                let snapshot = await db.collection('uids').get();
                let users = [];
                snapshot.forEach(doc => {
                    let appData = doc.data();
                    appData.id = doc.id;
                    users.push(appData);
                });
                return this.users = users;
            },

            async getEvents() {
                let snapshot = await db.collection('eventi').get();
                let events = [];
                snapshot.forEach(doc => {
                    let appData = doc.data();
                    appData.id = doc.id;
                    events.push(appData);
                });
                return this.events = events;
            },

            //ANCHOR Write
            async addEvent() {
                if (this.name && this.start && this.end) {
                    await db.collection('users').add({
                        id: this.uid,
                        type: "Special",
                        name: this.name,
                        details: this.details,
                        start: this.start + " " + this.starthour,
                        end: this.end + " " + this.endhour,
                        color: this.color
                    });
                    this.getusers();
                    this.name = "";
                    this.details = "";
                    this.start = "";
                    this.end = "";
                    this.color = "";

                } else {
                    alert('nome, start e end sono obbligatori');
                }
            },
            tocalendar() {
                this.$router.replace('/login');
            },
            //ANCHOR mostra dialog dell'evento
            showEvent({
                nativeEvent,
                event
            }) {
                const open = () => {
                    //assegna alle variabili del dialog l'evento dal db e l'elemento del DOM premuto
                    this.selectedEvent = event;
                    this.selectedElement = nativeEvent.target;
                    //delay di apertura
                    setTimeout(() => this.selectedOpen = true, 10)
                }
                //se si switcha da un event
                if (this.selectedOpen) {
                    this.selectedOpen = false
                    setTimeout(open, 10)
                } else {
                    open()
                }
                nativeEvent.stopPropagation()
            }
        }
    };
</script>