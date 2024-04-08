import { ActivityBaseResponse } from '../core/interfaces/activities/activitiesBaseResponse.interface';
import { Activity } from '../core/interfaces/activities/activity.interface';
import { PREFIX } from '../helpers/API';
import { ActivityInformationPost } from '../pages/Activity/AddActivity/AddActivity';
import { useBaseRepository } from './useBaseRepository';

export const useActivityRepository = () => {

	const [authorizedRequest] = useBaseRepository();

	const getActivityById = async (id: string | undefined): Promise<Activity | undefined> => {
		return await authorizedRequest<Activity>(`${PREFIX}/Activity/${id}`);
	};

	const getActivities = async (): Promise<Activity[] | undefined> => {
		const data = await authorizedRequest<ActivityBaseResponse>(`${PREFIX}/Activity/list`);
		return data?.entities;
	};

	const saveActivity = async (activity: ActivityInformationPost): Promise<void> => {
		await authorizedRequest<void>(`${PREFIX}/Activity`, {
			method: 'POST',
			data: {
				name: activity.name,
				section: activity.section,
				type: activity.type,
				level: activity.level,
				startDate: activity.startDate,
				endDate: activity.endDate,
				location: activity.location,
				link: activity.link,
				description: activity.description
			}
		});
	};

	return {
		getActivityById,
		getActivities,
		saveActivity
	};
};