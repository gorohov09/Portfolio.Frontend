import { Guid } from 'guid-typescript';
import { ParticipationActivityStatus } from '../../enums/participationActivity/participationActivityStatus.enum';
import { ParticipationActivityResult } from '../../enums/participationActivity/participationActivityResult.enum';
import { File } from '../file.interface';

export interface ParticipationActivity {
    id: Guid;
    status: ParticipationActivityStatus;
    result: ParticipationActivityResult;
    date: string;
    description: string;
    document: File;
    canEdit: boolean;
}