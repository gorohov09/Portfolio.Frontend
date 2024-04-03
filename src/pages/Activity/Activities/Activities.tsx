import { useEffect, useState } from 'react';
import { Activity } from '../../../core/interfaces/activities/activity.interface';
import styles from './Activities.module.css';
import { ActivityBaseResponse } from '../../../core/interfaces/activities/activitiesBaseResponse.interface';
import { PREFIX } from '../../../helpers/API';
import axios, { AxiosError } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../../../store/slices/user.slice';
import { ActivityCard } from '../../../components/ActivityCard/ActivityCard';
import Headling from '../../../components/Headling/Headling';
import { Button } from 'antd';
import { Role } from '../../../core/enums/role.enum';


export function Activities() {
	const navigate = useNavigate();
	const [activities, setActivities] = useState<Activity[]>([]);
	const {jwt, role} = useSelector((s: RootState) => s.user);
	const dispatch = useDispatch<AppDispatch>();

	const getActivities = async () => {
		try {
			const {data} = await axios.get<ActivityBaseResponse>(`${PREFIX}/Activity/list`, {
				headers: {
					'Authorization': `Bearer ${jwt}`
				}
			});
			setActivities(data.entities);
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
		getActivities();
	}, []);

	return (
		<div className={styles['activities-page']}>
			<div className={styles['header']}>
				<Headling>Мероприятия</Headling>
				{role == Role.Manager ? <><Button onClick={() => navigate('/admin/addActivity')}>Добавить мероприятие</Button></> : <></>}
			</div>
			<div className={styles['activities']}>
				{
					activities.map(el => (
						<ActivityCard activity={el} isAdmin={role == Role.Manager}/>
					))
				}
			</div>
			
		</div>
	);
}