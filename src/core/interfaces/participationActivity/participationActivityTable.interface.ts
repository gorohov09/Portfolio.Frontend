import { Guid } from 'guid-typescript';
import { ParticipationActivityStatus } from '../../enums/participationActivity/participationActivityStatus.enum';
import { ParticipationActivityResult } from '../../enums/participationActivity/participationActivityResult.enum';

export interface ParticipationActivityTable {
    id: Guid;
    activity: ActivityTable | null;
    status: ParticipationActivityStatus;
    result: ParticipationActivityResult;
    date: string;
    creationDate: string;
    updateDate: string;
}

export interface ActivityTable {
    id: Guid;
    name: string;
}