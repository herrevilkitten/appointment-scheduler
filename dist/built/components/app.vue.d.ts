import Vue from 'vue';
import { TimeSlot } from '../state';
export default class  extends Vue {
    appointment: {
        name: string;
        phone: string;
    };
    currentSlot: TimeSlot;
    readonly timeSlots: any;
    openDialog(slot: TimeSlot): void;
    saveAppointment(): void;
    closeDialog(): void;
}
