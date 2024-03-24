import { Guid } from 'guid-typescript';

export interface Institute {
    fullName: string;
    shortName: string;
}

export interface Faculty {
    id: Guid
    fullName: string;
    shortName: string;
}

export interface Speciality {
    name: string;
    number: string;
}