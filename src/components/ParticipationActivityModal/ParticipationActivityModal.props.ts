import { Dispatch, SetStateAction } from 'react';
import { ParticipationActivity } from '../../core/interfaces/participationActivity/participationActivity.interface';

export interface ParticipationActivityModalProps {
    participationActivity: ParticipationActivity | undefined;
    setParticipationActivity: Dispatch<SetStateAction<ParticipationActivity | undefined>>;
}