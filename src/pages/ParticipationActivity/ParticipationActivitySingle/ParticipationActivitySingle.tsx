import { useEffect, useState } from 'react';
import { ParticipationActivity } from '../../../core/interfaces/participationActivity/participationActivity.interface';
import { useParams } from 'react-router-dom';
import { PREFIX } from '../../../helpers/API';
import axios from 'axios';
import { ParticipationActivityModal } from '../../../components/ParticipationActivityModal/ParticipationActivityModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

export function ParticipationActivitySingle() {
	const { id } = useParams();
	const [participationActivity, setParticipationActivity] = useState<ParticipationActivity>();
	const jwt = useSelector((s: RootState) => s.user.jwt);

	const getParticipationActivity = async () => {
		try {
			const {data} = await axios.get<ParticipationActivity>(`${PREFIX}/ParticipationActivity/${id}`, {
				headers: {
					'Authorization': `Bearer ${jwt}`
				}
			});
			setParticipationActivity(data);
		} catch (e) {
			console.error(e);
			return;
		}
	};

	const onSaveParticipationActivity = async () => {
		try {
			await axios.put(`${PREFIX}/ParticipationActivity`, {
				id: participationActivity?.id,
				result: participationActivity?.result,
				date: participationActivity?.date,
				description: participationActivity?.description,
				fileId: participationActivity?.document?.id
			}, {
				headers: {
					'Authorization': `Bearer ${jwt}`
				}
			});
		} catch (e) {
			console.error(e);
			return;
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
			console.error(e);
			return;
		}
	};

	useEffect(() => {
		getParticipationActivity();
	}, []);

	return (
		<div>
			<ParticipationActivityModal 
				participationActivity={participationActivity} 
				setParticipationActivity={setParticipationActivity}
				onSaveParticipationActivity={onSaveParticipationActivity}
				onSubmitParticipationActivity={onSubmitParticipationActivity}/>
		</div>
	);
}