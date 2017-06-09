import Vue from 'vue';
import VueMaterial from 'vue-material';
import Vuex from 'vuex';

import 'vue-material/dist/vue-material.css';

import AppComponent from './components/app.vue';

import { Appointment, State, TimeSlot } from './state';

Vue.use(Vuex);
Vue.use(VueMaterial);

const store = new Vuex.Store({
    state: {
        slots: [],
    },
    mutations: {
        addTimeSlot(state: State, slot: TimeSlot) {
            state.slots.push(slot);
        },
    },
});

for (let hour = 9; hour < 18; ++hour) {
    const hourString = String(hour > 12 ? hour - 12 : hour);
    const hourType = hour >= 12 ? 'PM' : 'AM';
    const label = `${hourString}:00 ${hourType}`;
    store.commit('addTimeSlot', {
        hour,
        label,
        appointment: null,
    });
}

new Vue({
    el: '#app',
    template: '<app-component></app-component>',
    store,
    components: {
        AppComponent
    },
    filters: {
        hour: function (hour) {

        }
    }
});
