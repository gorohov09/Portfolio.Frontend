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
import Headling from '../../../components/Headling/Headling';
import { Role } from '../../../core/enums/role.enum';

export function ParticipationActivities() {
	const navigate = useNavigate();
	const [participationActivities, setParticipationActivities] = useState<ParticipationActivityTable[]>([]);
	const { jwt, role } = useSelector((s: RootState) => s.user);
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
			<Headling>{role === Role.Student ? 'Ваши участия в мероприятях' : 'Ваши проверки'}</Headling>
			{
				role === Role.Student
					? <Button className={styles['add-button']} onClick={addParticipationActivity}>Добавить участие в мероприятии</Button>
					: <></>
			}
			<ParticipationActivitiesTable participationActivities={participationActivities} />
			<Outlet />
		</div>
	);
}