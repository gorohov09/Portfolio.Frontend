import { useState, useEffect } from 'react';
import { ParticipationActivityTable } from '../../../core/interfaces/participationActivity/participationActivityTable.interface';
import axios from 'axios';
import { PREFIX } from '../../../helpers/API';
import { ParticipationActivitiesTable } from '../../../components/ParticipationActivitiesTable/ParticipationActivitiesTable';
import { ParticipationActivityBaseResponse } from '../../../core/interfaces/participationActivity/participationActivityBaseResponse.interface';
import styles from './ParticipationActivities.module.css';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export function ParticipationActivities() {
	const navigate = useNavigate();
	const [participationActivities, setParticipationActivities] = useState<ParticipationActivityTable[]>([]);

	const getParticipationActivities = async () => {
		try {
			const {data} = await axios.get<ParticipationActivityBaseResponse>(`${PREFIX}/ParticipationActivity/list`, {
				headers: {
					'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2MjJkYzhiZS03MTBjLTM3NjktZTk5ZC02ZmZkY2I5N2Y2YTUiLCJMb2dpbiI6Imdvcm9ob3YiLCJyb2xlIjoiU3R1ZGVudCIsIm5iZiI6MTcxMTA5NTU5NCwiZXhwIjoxNzExNjk1NTk0LCJpYXQiOjE3MTEwOTU1OTQsImlzcyI6IklzcyIsImF1ZCI6ImF1ZGllbmNlX0F1dGgifQ.WNgX7nJnbvUXOppNzHbrCtXtwLr8LlCHDTNsSEmol80NuRwtE815L55vYdQdD0JFEyLrVjgw5kWf7WDx-izUYQ'
				}
			});
			setParticipationActivities(data.entities);
		} catch (e) {
			console.error(e);
			return;
		}
	};

	const addParticipationActivity = async () => {
		const {data} = await axios.post(`${PREFIX}/ParticipationActivity`, {}, {
			headers: {
				'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2MjJkYzhiZS03MTBjLTM3NjktZTk5ZC02ZmZkY2I5N2Y2YTUiLCJMb2dpbiI6Imdvcm9ob3YiLCJyb2xlIjoiU3R1ZGVudCIsIm5iZiI6MTcxMTA5NTU5NCwiZXhwIjoxNzExNjk1NTk0LCJpYXQiOjE3MTEwOTU1OTQsImlzcyI6IklzcyIsImF1ZCI6ImF1ZGllbmNlX0F1dGgifQ.WNgX7nJnbvUXOppNzHbrCtXtwLr8LlCHDTNsSEmol80NuRwtE815L55vYdQdD0JFEyLrVjgw5kWf7WDx-izUYQ'
			}
		});

		navigate(`/participationActivities/${data.participationActivityId}`);
	};

	useEffect(() => {
		getParticipationActivities();
	}, []);

	return (
		<div className={styles['participation-activities-page']}>
			<Button onClick={addParticipationActivity}>Добавить мероприятие</Button>
			<ParticipationActivitiesTable participationActivities={participationActivities} />
		</div>
	);
}