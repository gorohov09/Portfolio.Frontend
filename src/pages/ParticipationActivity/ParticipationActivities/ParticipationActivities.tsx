import { useState, useEffect } from 'react';
import { ParticipationActivityTable } from '../../../core/interfaces/participationActivity/participationActivityTable.interface';
import axios from 'axios';
import { PREFIX } from '../../../helpers/API';
import { ParticipationActivitiesTable } from '../../../components/ParticipationActivitiesTable/ParticipationActivitiesTable';
import { ParticipationActivityBaseResponse } from '../../../core/interfaces/participationActivity/participationActivityBaseResponse.interface';
import styles from './ParticipationActivities.module.css';
import { Button } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

export function ParticipationActivities() {
	const navigate = useNavigate();
	const [participationActivities, setParticipationActivities] = useState<ParticipationActivityTable[]>([]);
	const jwt = useSelector((s: RootState) => s.user.jwt);

	const getParticipationActivities = async () => {
		try {
			const {data} = await axios.get<ParticipationActivityBaseResponse>(`${PREFIX}/ParticipationActivity/list`, {
				headers: {
					'Authorization': `Bearer ${jwt}`
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
				'Authorization': `Bearer ${jwt}`
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
			<Outlet />
		</div>
	);
}