import { Guid } from 'guid-typescript';
import { ActivityName } from '../core/interfaces/activities/activityName.interface';
import { ActivityNamesBaseResponse } from '../core/interfaces/activities/activityNamesBaseResponse.interface';
import { ParticipationActivity } from '../core/interfaces/participationActivity/participationActivity.interface';
import { ParticipationActivityBaseResponse } from '../core/interfaces/participationActivity/participationActivityBaseResponse.interface';
import { ParticipationActivityTable } from '../core/interfaces/participationActivity/participationActivityTable.interface';
import { PREFIX } from '../helpers/API';
import { useBaseRepository } from './useBaseRepository';

export const useParticipationActivityRepository = () => {

	const [authorizedRequest] = useBaseRepository();

	const getParticipationActivity = async (id: string | undefined): Promise<ParticipationActivity | undefined> => {
		return await authorizedRequest<ParticipationActivity>(`${PREFIX}/ParticipationActivity/${id}`);
	};

	const getParticipationActivities = async (): Promise<ParticipationActivityTable[] | undefined> => {
		const data = await authorizedRequest<ParticipationActivityBaseResponse>(`${PREFIX}/ParticipationActivity/list`);
		return data?.entities;
	};

	const getActivityNames = async (): Promise<ActivityName[] | undefined> => {
		const data = await authorizedRequest<ActivityNamesBaseResponse>(`${PREFIX}/Activity/list/names`);
		return data?.entities;
	};

	const saveParticipationActivity = async (participationActivity: ParticipationActivity): Promise<void> => {
		await authorizedRequest<void>(`${PREFIX}/ParticipationActivity`, {
			method: 'PUT',
			data: {
				id: participationActivity?.id,
				result: participationActivity?.result,
				date: participationActivity?.date,
				description: participationActivity?.description,
				fileId: participationActivity?.document?.id,
				activityId: participationActivity?.activity?.id
			}
		});
	};

	const submitParticipationActivity = async (id: string): Promise<void> => {
		await authorizedRequest<void>(`${PREFIX}/ParticipationActivity/Submit`, {
			method: 'POST',
			data: { id }
		});
	};

	const sendRevisionParticipationActivity = async (id: string): Promise<void> => {
		await authorizedRequest<void>(`${PREFIX}/ParticipationActivity/SendRevision`, {
			method: 'POST',
			data: { id }
		});
	};

	const confirmParticipationActivity = async (id: string): Promise<void> => {
		await authorizedRequest<void>(`${PREFIX}/ParticipationActivity/Confirm`, {
			method: 'POST',
			data: { id }
		});
	};

	const addParticipationActivity = async (activityId: string | null): Promise<Guid | undefined> => {
		const data = await authorizedRequest<{participationActivityId: Guid}>(`${PREFIX}/ParticipationActivity`, {
			method: 'POST',
			data: {
				activityId: activityId
			}
		});

		return data?.participationActivityId;
	};

	return {
		getParticipationActivities,
		getParticipationActivity,
		getActivityNames,
		saveParticipationActivity,
		submitParticipationActivity,
		sendRevisionParticipationActivity,
		confirmParticipationActivity,
		addParticipationActivity
	};
};