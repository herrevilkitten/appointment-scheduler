<template>
    <div class="application">
        <md-dialog ref="appointmentDialog" md-open-from="#tableHeading" md-close-to="#tableHeading">
            <md-dialog-title>Set Appointment</md-dialog-title>
    
            <md-dialog-content>
                <form>
                    <md-input-container>
                        <label>Name</label>
                        <md-input v-model="appointment.name"></md-input>
                    </md-input-container>
                    <md-input-container>
                        <label>Phone</label>
                        <md-input type="tel" v-model="appointment.phone"></md-input>
                    </md-input-container>
                </form>
            </md-dialog-content>
    
            <md-dialog-actions>
                <md-button class="md-primary" @click.native="saveAppointment()">Save</md-button>
                <md-button class="md-default" @click.native="closeDialog()">Cancel</md-button>
            </md-dialog-actions>
        </md-dialog>
    
        <md-toolbar>
            <h2 class="md-title" style="flex: 1">Appointment Scheduler</h2>
        </md-toolbar>
    
        <md-layout md-gutter>
            <md-layout md-flex="33" md-flex-offset="33">
                <md-table>
                    <md-table-header>
                        <md-table-row>
                            <md-table-head md-numeric id="tableHeading">Time</md-table-head>
                        </md-table-row>
                    </md-table-header>
                    <md-table-body>
                        <md-table-row v-for="slot in timeSlots" :key="slot.hour">
                            <md-table-cell @click.native="openDialog(slot)" class="hourCell" md-numeric :class="{hasAppointment: slot.appointment != null}">
                                {{slot.label}}
                            </md-table-cell>
                        </md-table-row>
                    </md-table-body>
                </md-table>
            </md-layout>
        </md-layout>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { TimeSlot, Appointment } from '../state';

@Component({

})
export default class extends Vue {
    appointment = {
        name: '',
        phone: ''
    };
    currentSlot: TimeSlot;

    get timeSlots() {
        return this.$store.state.slots;
    }

    openDialog(slot: TimeSlot) {
        this.currentSlot = slot;
        if (slot.appointment) {
            this.appointment = slot.appointment;
        } else {
            this.appointment = {
                name: '',
                phone: ''
            };
        }
        (<any>this.$refs.appointmentDialog).open();
    }

    saveAppointment() {
        this.currentSlot.appointment = {
            name: this.appointment.name,
            phone: this.appointment.phone
        };
        this.closeDialog();
    }

    closeDialog() {
        (<any>this.$refs.appointmentDialog).close();
    }
}
</script>

<style>
.hourCell {
    cursor: pointer;
}

.md-table {
    width: 100%;
}

.hasAppointment {
    background-color: red;
    color: white;
}
</style>
