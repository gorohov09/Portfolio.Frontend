import { useState, useEffect } from 'react';
import { ParticipationActivityTable } from '../../../core/interfaces/participationActivity/participationActivityTable.interface';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../../helpers/API';
import { ParticipationActivitiesTable } from '../../../components/ParticipationActivitiesTable/ParticipationActivitiesTable';
import { ParticipationActivityBaseResponse } from '../../../core/interfaces/participationActivity/participationActivityBaseResponse.interface';
import styles from './ParticipationActivities.module.css';
import { Button } from 'antd';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { userActions } from '../../../store/slices/user.slice';

export function ParticipationActivities() {
	const navigate = useNavigate();
	const [participationActivities, setParticipationActivities] = useState<ParticipationActivityTable[]>([]);
	const jwt = useSelector((s: RootState) => s.user.jwt);
	const dispatch = useDispatch<AppDispatch>();
	const { id } = useParams();

	useEffect(() => {
		getParticipationActivities();
	}, [id]);

	const getParticipationActivities = async () => {
		try {
			const {data} = await axios.get<ParticipationActivityBaseResponse>(`${PREFIX}/ParticipationActivity/list`, {
				headers: {
					'Authorization': `Bearer ${jwt}`
				}
			});
			setParticipationActivities(data.entities);
		} catch (e) {
			if (e instanceof AxiosError) {
				if (e.response?.status == 401) {
					dispatch(userActions.logout());
					navigate('/auth/login');
				}
			}
		}
	};

	const addParticipationActivity = async () => {
		try {
			const {data} = await axios.post(`${PREFIX}/ParticipationActivity`, {}, {
				headers: {
					'Authorization': `Bearer ${jwt}`
				}
			});

			navigate(`/participationActivities/${data.participationActivityId}`);
		} catch (e) {
			if (e instanceof AxiosError) {
				if (e.response?.status == 401) {
					dispatch(userActions.logout());
					navigate('/auth/login');
				}
			}
		}
	};

	return (
		<div className={styles['participation-activities-page']}>
			<Button onClick={addParticipationActivity}>Добавить мероприятие</Button>
			<ParticipationActivitiesTable participationActivities={participationActivities} />
			<Outlet />
		</div>
	);
}