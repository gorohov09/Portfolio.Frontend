import { useEffect, useState } from 'react';
import { ParticipationActivity } from '../../../core/interfaces/participationActivity/participationActivity.interface';
import { useParams } from 'react-router-dom';
import { PREFIX } from '../../../helpers/API';
import axios from 'axios';
import { ParticipationActivityModal } from '../../../components/ParticipationActivityModal/ParticipationActivityModal';

export function ParticipationActivitySingle() {
	const { id } = useParams();
	const [participationActivity, setParticipationActivity] = useState<ParticipationActivity>();

	const getParticipationActivity = async () => {
		try {
			const {data} = await axios.get<ParticipationActivity>(`${PREFIX}/ParticipationActivity/${id}`, {
				headers: {
					'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2MjJkYzhiZS03MTBjLTM3NjktZTk5ZC02ZmZkY2I5N2Y2YTUiLCJMb2dpbiI6Imdvcm9ob3YiLCJyb2xlIjoiU3R1ZGVudCIsIm5iZiI6MTcxMTA2MTM5MCwiZXhwIjoxNzExNjYxMzkwLCJpYXQiOjE3MTEwNjEzOTAsImlzcyI6IklzcyIsImF1ZCI6ImF1ZGllbmNlX0F1dGgifQ.ufZo1nNBC-ec8hlxOBei0oTXxevfm7jdDXrgJZeZc8wKFKS37CglammFN5GxVoKM3g22hTfbaP82rXaRqDIV8g'
				}
			});
			setParticipationActivity(data);
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
			<ParticipationActivityModal participationActivity={participationActivity} setParticipationActivity={setParticipationActivity}/>
		</div>
	);
}