import { Guid } from 'guid-typescript';
import { Faculty, Institute, Speciality } from './institute.interdace';
import { EducationLevel } from '../../enums/portfolio/educationLevel.enum';

export interface Portfolio {
    id: Guid;
    lastName: string;
    firstName: string;
    surname: string | null;
    birthday: string | null;
    institute: Institute | null;
    faculty: Faculty | null;
    speciality: Speciality | null;
    educationLevel: EducationLevel | null;
    groupNumber: string | null;
}