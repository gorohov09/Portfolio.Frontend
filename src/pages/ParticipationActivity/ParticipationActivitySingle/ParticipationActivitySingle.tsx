import { useEffect, useState } from 'react';
import { ParticipationActivity } from '../../../core/interfaces/participationActivity/participationActivity.interface';
import { useNavigate, useParams } from 'react-router-dom';
import { PREFIX } from '../../../helpers/API';
import axios, { AxiosError } from 'axios';
import { ParticipationActivityModal } from '../../../components/ParticipationActivityModal/ParticipationActivityModal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { ActivityName } from '../../../core/interfaces/activities/activityName.interface';
import { ActivityNamesBaseResponse } from '../../../core/interfaces/activities/activityNamesBaseResponse.interface';
import { userActions } from '../../../store/slices/user.slice';

export function ParticipationActivitySingle() {
	const { id } = useParams();
	const [participationActivity, setParticipationActivity] = useState<ParticipationActivity>();
	const [activityNames, setActivityNames] = useState<ActivityName[]>();
	const jwt = useSelector((s: RootState) => s.user.jwt);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const getParticipationActivity = async () => {
		try {
			const {data} = await axios.get<ParticipationActivity>(`${PREFIX}/ParticipationActivity/${id}`, {
				headers: {
					'Authorization': `Bearer ${jwt}`
				}
			});
			setParticipationActivity(data);
		} catch (e) {
			if (e instanceof AxiosError) {
				if (e.response?.status == 401) {
					dispatch(userActions.logout());
					navigate('/auth/login');
				}
			}
		}
	};

	const getActivityNames = async () => {
		try {
			const {data} = await axios.get<ActivityNamesBaseResponse>(`${PREFIX}/Activity/list/names`, {
				headers: {
					'Authorization': `Bearer ${jwt}`
				}
			});
			setActivityNames(data.entities);
		} catch (e) {
			if (e instanceof AxiosError) {
				if (e.response?.status == 401) {
					dispatch(userActions.logout());
					navigate('/auth/login');
				}
			}
		}
	};

	const onSaveParticipationActivity = async () => {
		try {
			await axios.put(`${PREFIX}/ParticipationActivity`, {
				id: participationActivity?.id,
				result: participationActivity?.result,
				date: participationActivity?.date,
				description: participationActivity?.description,
				fileId: participationActivity?.document?.id,
				activityId: participationActivity?.activity?.id
			}, {
				headers: {
					'Authorization': `Bearer ${jwt}`
				}
			});
		} catch (e) {
			if (e instanceof AxiosError) {
				if (e.response?.status == 401) {
					dispatch(userActions.logout());
					navigate('/auth/login');
				}
			}
		}
	};

	const onSubmitParticipationActivity = async () => {
		try {
			await axios.post(`${PREFIX}/ParticipationActivity/Submit`, {
				id: participationActivity?.id
			}, {
				headers: {
					'Authorization': `Bearer ${jwt}`
				}
			});

			await getParticipationActivity();

		} catch (e) {
			if (e instanceof AxiosError) {
				if (e.response?.status == 401) {
					dispatch(userActions.logout());
					navigate('/auth/login');
				}
			}
		}
	};

	useEffect(() => {
		getParticipationActivity();
		getActivityNames();
	}, []);

	return (
		<div>
			<ParticipationActivityModal 
				participationActivity={participationActivity} 
				activityNames={activityNames}
				setParticipationActivity={setParticipationActivity}
				onSaveParticipationActivity={onSaveParticipationActivity}
				onSubmitParticipationActivity={onSubmitParticipationActivity}/>
		</div>
	);
}