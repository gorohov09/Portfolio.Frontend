import { Guid } from 'guid-typescript';
import { ActivityType } from '../../enums/activity/activityType.enum';
import { ActivitySection } from '../../enums/activity/activitySection.enum';
import { ActivityLevel } from '../../enums/activity/activityLevel.enum';
import { Period } from '../period.interface';

export interface Activity {
    id: Guid;
    name: string;
    type: ActivityType;
    section: ActivitySection;
    level: ActivityLevel;
    period: Period;
    location: string;
    description: string;
    link: string;
    canEdit: boolean;
    canCreateParticipationActivity: boolean;
}