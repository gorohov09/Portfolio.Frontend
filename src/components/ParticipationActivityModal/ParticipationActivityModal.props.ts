import { Dispatch, SetStateAction } from 'react';
import { ParticipationActivity } from '../../core/interfaces/participationActivity/participationActivity.interface';
import { ActivityName } from '../../core/interfaces/activities/activityName.interface';

export interface ParticipationActivityModalProps {
    participationActivity: ParticipationActivity | undefined;
    activityNames: ActivityName[] | undefined;
    setParticipationActivity: Dispatch<SetStateAction<ParticipationActivity | undefined>>;
}