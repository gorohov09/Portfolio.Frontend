import { ActivityName } from './activityName.interface';

export interface ActivityNamesBaseResponse {
    entities: ActivityName[];
    totalCount: number;
}