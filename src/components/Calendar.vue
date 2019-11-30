<template>
    <v-row class="fill-height">
        <v-col>
            <v-sheet height="64">
                <v-toolbar flat color="white">
                    <v-btn color="primary" dark @click.stop="dialog = true">
                        NUOVO EVENTO
                    </v-btn>
                    <v-btn outlined class="mr-4" @click="setToday">
                        OGGI
                    </v-btn>
                    <v-btn fab text small @click="prev">
                        <v-icon small>mdi-chevron-left</v-icon>
                    </v-btn>
                    <v-btn fab text small @click="next">
                        <v-icon small>mdi-chevron-right</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{ title }}</v-toolbar-title>
                    <div class="flex-grow-1"></div>
                    <v-menu bottom right>
                        <template v-slot:activator="{ on }">
                            <v-btn outlined v-on="on">
                                <span>{{ typeToLabel[type] }}</span>
                                <v-icon right>mdi-menu-down</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item @click="type = 'day'">
                                <v-list-item-title>Mese</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="type = 'week'">
                                <v-list-item-title>Settimana</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="type = 'month'">
                                <v-list-item-title>Mese</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="type = '4day'">
                                <v-list-item-title>4 Giorni</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-toolbar>
            </v-sheet>

            <v-dialog v-model="dialog" max-width="500">
                <v-card>
                    <v-container>
                        <v-form @submit.prevent="addEvent">
                            <v-text-field v-model="name" type="text" label="nome dell'evento"></v-text-field>
                            <v-text-field v-model="details" type="text" label="dettagli"></v-text-field>
                            <v-text-field v-model="start" type="date" label="inizio"></v-text-field>
                            <v-text-field v-model="end" type="date" label="fine"></v-text-field>
                            <v-text-field v-model="color" type="color" label="colore(clicca per la palette)">
                            </v-text-field>
                            <v-btn type="submit" color="primary" class="mr-4" @click.stop="dialog = false">
                                CREA EVENTO
                            </v-btn>
                        </v-form>
                    </v-container>
                </v-card>
            </v-dialog>

            <v-dialog v-model="dialogDate" max-width="500">
                <v-card>
                    <v-container>
                        <v-form @submit.prevent="addEvent">
                            <v-text-field v-model="name" type="text" label="nome dell'evento"></v-text-field>
                            <v-text-field v-model="details" type="text" label="dettagli"></v-text-field>
                            <v-text-field v-model="start" type="date" label="inizio"></v-text-field>
                            <v-text-field v-model="end" type="date" label="fine"></v-text-field>
                            <v-text-field v-model="color" type="color" label="colore(clicca per la palette)">
                            </v-text-field>
                            <v-btn type="submit" color="primary" class="mr-4" @click.stop="dialog = false">
                                CREA EVENTO
                            </v-btn>
                        </v-form>
                    </v-container>
                </v-card>
            </v-dialog>

            <v-sheet height="600">
                <v-calendar ref="calendar" v-model="focus" color="primary" :events="events" :event-color="getEventColor"
                    :event-margin-bottom="3" :now="today" :type="type" @click:event="showEvent" @click:more="viewDay"
                    @click:date="setDialogDate" @change="updateRange"></v-calendar>
                <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" full-width
                    offset-x>
                    <v-card color="grey lighten-4" :width="350" flat>
                        <v-toolbar :color="selectedEvent.color" dark>
                            <v-btn @click="deleteEvent(selectedEvent.id)" icon>
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                            <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                            <div class="flex-grow-1"></div>
                        </v-toolbar>

                        <v-card-text>
                            <form v-if="currentlyEditing !== selectedEvent.id">
                                {{ selectedEvent.details }}
                            </form>
                            <form v-else>
                                <textarea-autosize v-model="selectedEvent.details" type="text" style="width: 100%"
                                    :min-height="100" placeholder="add note">
                                </textarea-autosize>
                            </form>
                        </v-card-text>

                        <v-card-actions>
                            <v-btn text color="secondary" @click="selectedOpen = false">
                                CHIUDI
                            </v-btn>
                            <v-btn v-if="currentlyEditing !== selectedEvent.id" text
                                @click.prevent="editEvent(selectedEvent)">
                                MODIFICA
                            </v-btn>
                            <v-btn text v-else type="submit" @click.prevent="updateEvent(selectedEvent)">
                                SALVA
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-menu>
            </v-sheet>
        </v-col>
    </v-row>
</template>

<script>
import {
    db
} from '@/main';
export default {
    data: () => ({
        today: new Date().toISOString().substr(0, 10),
        focus: new Date().toISOString().substr(0, 10),
        type: 'month',
        typeToLabel: {
            month: 'Mese',
            week: 'Settimana',
            day: 'Giorno',
            '4day': '4 Giorni',
        },
        //ANCHOR settings dei vari campi
        name: null,
        details: null,
        start: null,
        end: null,
        color: '#1976D2',
        currentlyEditing: null,
        //documents da firebase
        events: [],
        dialog: false,
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false
    }),
    //al caricamento della pagina
    mounted() {
        this.getEvents();
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

            const startMonth = this.monthFormatter(start)
            const endMonth = this.monthFormatter(end)
            const suffixMonth = startMonth === endMonth ? '' : endMonth

            const startYear = start.year
            const endYear = end.year
            const suffixYear = startYear === endYear ? '' : endYear

            const startDay = start.day + this.degree(start.day)
            const endDay = end.day + this.degree(end.day)

            switch (this.type) {
                case 'month':
                    return `${startMonth} ${startYear}`
                case 'week':
                case '4day':
                    return `${startDay} ${startMonth}  ${startYear} - ${endDay} ${suffixMonth}  ${suffixYear}`
                case 'day':
                    return `${startDay} ${startMonth}  ${startYear}`
            }
            return '';
        },
        monthFormatter() {
            return this.$refs.calendar.getFormatter({
                timeZone: 'UTC',
                month: 'long',
            })
        },
    },
    methods: {
        
        //ANCHOR push delle collections nell'array events
        async getEvents() {
            //con await per far terminare la chiamata asincrona, per fare in modo che la promise ritorni il risultato
            let snapshot = await db.collection('eventi').get();
            let events = [];
            snapshot.forEach(doc => {
                let appData = doc.data();
                appData.id = doc.id;
                //inserisce nell' array degli eventi una serie di oggetti corrispondenti alle collections del db
                events.push(appData);
            });
            this.events = events;
        },
        //ANCHOR Update
        async updateEvent(event) {
            //update della collection 
            await db.collection('eventi').doc(this.currenlyEditing).update({
                details: event.details
            });
            //reset
            this.selectedOpen = false;
            this.currentlyEditing = null;
        },
        //ANCHOR Write
        async addEvent() {
            if (this.name && this.start && this.end) {
                await db.collection('eventi').add({
                    name: this.name,
                    details: this.details,
                    start: this.start,
                    end: this.end,
                    color: this.color
                });
                this.getEvents();
                this.name = "";
                this.details = "";
                this.start = "";
                this.end = "";
                this.color = "";

            } else {
                alert('nome, start e end sono obbligatori');

            }
        },
        //ANCHOR delete
        async deleteEvent(event) {
            await db.collection('eventi').doc(event).delete();

            //reset
            this.selectedOpen = false;
            this.getEvents();
        },
        //al click del giorno o di more(quando ci sono tanti eveti in un giorno)
        viewDay({
            date
        }) {
            this.focus = date
            this.type = 'day'
        },
        //setta il colore dall'oggetto del db
        getEventColor(event) {
            return event.color
        },
        //al click di Today
        setToday() {
            //mette focus a today
            this.focus = this.today
        },
        //pagina precedente
        prev() {
            this.$refs.calendar.prev()
        },
        //pagina successiva
        next() {
            this.$refs.calendar.next()
        },
        editEvent(event) {
            this.currentlyEditing = event.id;

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
                //dilay di apertura
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
        },

        updateRange({
            start,
            end
        }) {

            this.start = start
            this.end = end
        },
        degree() {
            return '°'
        },
    }
};
        
</script>