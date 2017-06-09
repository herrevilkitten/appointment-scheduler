import Vue from 'vue';
import Vuex from 'vuex';
import VueMaterial from 'vue-material';

import 'vue-material/dist/vue-material.css';

import AppComponent from './components/App.vue';

import { TimeSlot, Appointment, State } from './state';

Vue.use(Vuex);
Vue.use(VueMaterial);

const store = new Vuex.Store({
    state: {
        slots: []
    },
    mutations: {
        addTimeSlot(state: State, slot: TimeSlot) {
            state.slots.push(slot);
        }
    }
});

for (let hour = 9; hour < 18; ++hour) {
    let hourString = String(hour > 12 ? hour - 12 : hour);
    const label = `${hourString}:00`;
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
