import { Guid } from 'guid-typescript';
import { Faculty, Institute, Speciality } from './institute.interdace';
import { EducationLevel } from '../../enums/portfolio/educationLevel.enum';
import { ActivitySection } from '../../enums/activity/activitySection.enum';
import { ActivityType } from '../../enums/activity/activityType.enum';
import { ActivityLevel } from '../../enums/activity/activityLevel.enum';

export interface PortfolioInterface {
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
    blocks: PortfolioBlock[];
}

export interface PortfolioBlock {
    section: ActivitySection;
    participationActivities: PortfolioParticipationActivity[]

}

export interface PortfolioParticipationActivity {
    id: Guid;
    date: string;
    activity: PortfolioActivity;
    document: PortfolioParticipationActivityDocument;
}

export interface PortfolioActivity {
    id: Guid;
    name: string;
    type: ActivityType;
    level: ActivityLevel;
}

export interface PortfolioParticipationActivityDocument {
    id: Guid;
    fileId: Guid;
}