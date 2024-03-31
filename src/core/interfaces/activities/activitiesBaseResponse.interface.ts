import { Activity } from './activity.interface';

export interface ActivityBaseResponse {
    entities: Activity[];
    totalCount: number;
}