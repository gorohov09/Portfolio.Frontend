import { Guid } from 'guid-typescript';
import { ActivityLevel } from '../../core/enums/activity/activityLevel.enum';
import { ActivityType } from '../../core/enums/activity/activityType.enum';

export interface ParticipationActivityCardProps {
    title: string;
    date: string;
    type: ActivityType; 
    level: ActivityLevel;
    fileId: Guid;
}