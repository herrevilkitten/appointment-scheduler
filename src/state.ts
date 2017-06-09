export interface Appointment {
    name: string;
    phone: string;
}

export interface TimeSlot {
    hour: number;
    label: string;
    appointment?: Appointment;
}

export interface State {
    slots: TimeSlot[];
}
