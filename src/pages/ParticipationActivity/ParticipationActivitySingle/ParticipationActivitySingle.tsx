import { useEffect, useState } from 'react';
import { ParticipationActivity } from '../../../core/interfaces/participationActivity/participationActivity.interface';
import { useParams } from 'react-router-dom';
import { ParticipationActivityModal } from '../../../components/ParticipationActivityModal/ParticipationActivityModal';
import { ActivityName } from '../../../core/interfaces/activities/activityName.interface';
import { useParticipationActivityRepository } from '../../../repositories/useParticipationActivityRepository';

export function ParticipationActivitySingle() {
	const { id } = useParams();
	const [participationActivity, setParticipationActivity] = useState<ParticipationActivity>();
	const [activityNames, setActivityNames] = useState<ActivityName[]>();
	const {getParticipationActivity, getActivityNames} = useParticipationActivityRepository();

	useEffect(() => {
		const fetchData = async () => {
			const activity = await getParticipationActivity(id);
			setParticipationActivity(activity);

			const names = await getActivityNames();
			setActivityNames(names);
		};
		fetchData();
	}, [id]);

	return (
		<div>
			<ParticipationActivityModal 
				participationActivity={participationActivity} 
				activityNames={activityNames}
				setParticipationActivity={setParticipationActivity}/>
		</div>
	);
}