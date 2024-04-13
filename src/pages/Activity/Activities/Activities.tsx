import { useEffect, useState } from 'react';
import { Activity } from '../../../core/interfaces/activities/activity.interface';
import styles from './Activities.module.css';
import { useNavigate } from 'react-router-dom';
import { ActivityCard } from '../../../components/ActivityCard/ActivityCard';
import Headling from '../../../components/Headling/Headling';
import { Button } from 'antd';
import { Role } from '../../../core/enums/role.enum';
import { useActivityRepository } from '../../../repositories/useActivityRepository';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';


export function Activities() {
	const navigate = useNavigate();
	const [activities, setActivities] = useState<Activity[] | undefined>([]);
	const {role} = useSelector((s: RootState) => s.user);
	const { getActivities } = useActivityRepository();


	useEffect(() => {
		const fetchData = async () => {
			const activities = await getActivities();
			setActivities(activities);
		};
		fetchData();
	}, []);

	return (
		<div className={styles['activities-page']}>
			<div className={styles['header']}>
				<Headling>Мероприятия</Headling>
				{role == Role.Manager ? <><Button onClick={() => navigate('/admin/addActivity')}>Добавить мероприятие</Button></> : <></>}
			</div>
			<div className={styles['activities']}>
				{
					activities?.map(el => (
						<ActivityCard activity={el} isAdmin={role == Role.Manager}/>
					))
				}
			</div>
			
		</div>
	);
}