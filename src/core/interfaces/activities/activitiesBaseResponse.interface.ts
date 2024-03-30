import { Activity } from './activity.interface';

export interface ActivityNamesBaseResponse {
    entities: Activity[];
    totalCount: number;
}