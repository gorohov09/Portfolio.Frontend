import { ParticipationActivityTable } from './participationActivityTable.interface';

export interface ParticipationActivityBaseResponse {
    entities: ParticipationActivityTable[];
    totalCount: number;
}