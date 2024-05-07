import { ActivityLevel } from '../core/enums/activity/activityLevel.enum';
import { ActivitySection } from '../core/enums/activity/activitySection.enum';
import { ActivityType } from '../core/enums/activity/activityType.enum';
import { ActivityBaseResponse } from '../core/interfaces/activities/activitiesBaseResponse.interface';
import { Activity } from '../core/interfaces/activities/activity.interface';
import { PREFIX } from '../helpers/API';
import { ActivityInformationPost } from '../pages/Activity/AddActivity/AddActivity';
import { useBaseRepository } from './useBaseRepository';

export interface ActivityFilter 
{
	type: ActivityType;
	section: ActivitySection;
	level: ActivityLevel;
	name: string | undefined;
}

export const useActivityRepository = () => {

	const [authorizedRequest] = useBaseRepository();

	const getActivityById = async (id: string | undefined): Promise<Activity | undefined> => {
		const {data} = await authorizedRequest<Activity>(`${PREFIX}/Activity/${id}`);
		return data; 
	};

	const getActivities = async (filter: ActivityFilter): Promise<Activity[] | undefined> => {
		const {data} = await authorizedRequest<ActivityBaseResponse>(`${PREFIX}/Activity/list`, {
			method: 'POST',
			data: {
				name: filter.name,
				type: filter.type,
				section: filter.section,
				level: filter.level
			}
		});
		return data?.entities;
	};

	const saveActivity = async (activity: ActivityInformationPost): Promise<boolean> => {
		const {success} = await authorizedRequest<void>(`${PREFIX}/Activity`, {
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

		return success;
	};

	return {
		getActivityById,
		getActivities,
		saveActivity
	};
};