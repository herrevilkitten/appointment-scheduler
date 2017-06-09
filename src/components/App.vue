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
                        <md-input type="tel" v-mask="'(999) 999-9999'" v-model="appointment.phone"></md-input>
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
    
        <md-tabs>
            <md-tab md-label="Times">
                <md-list>
                    <md-list-item v-for="slot in timeSlots" :key="slot.hour" @click.native="openDialog(slot)" class="selectable" :class="{hasAppointment: slot.appointment != null}">
                        <span class="hourCell">
                            {{slot.label}}
                        </span>
                        <span class="nameCell">
                            {{ slot.appointment ? slot.appointment.name: '' }}
                        </span>
                    </md-list-item>
                </md-list>
            </md-tab>
        </md-tabs>
    </div>
</template>

<script lang="ts">
import AwesomeMask from 'awesome-mask';
import Vue from 'vue';
import Component from 'vue-class-component';

import { TimeSlot, Appointment } from '../state';

@Component({
    components: {
    },
    directives: {
        mask: AwesomeMask
    }
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
            this.appointment = {
                name: slot.appointment.name,
                phone: slot.appointment.phone,
            }
        } else {
            this.appointment = {
                name: '',
                phone: ''
            };
        }
        (<any>this.$refs.appointmentDialog).open();
    }

    saveAppointment() {
        if (this.appointment.name.trim().length === 0 && this.appointment.phone.trim().length === 0) {
            this.currentSlot.appointment = undefined;
        } else {
            this.currentSlot.appointment = {
                name: this.appointment.name,
                phone: this.appointment.phone
            };
        }
        this.closeDialog();
    }

    closeDialog() {
        (<any>this.$refs.appointmentDialog).close();
    }
}
</script>

<style>
.selectable {
    cursor: pointer;
}

.hourCell {
    width: 150px;
    text-align: right;
    font-family: Courier New, Courier, monospace;
}

.nameCell {
    padding-left: 20px;
    flex: 1;
}

.hasAppointment {
    background-color: red;
    color: white;
}
</style>
