import { useState, useEffect } from 'react';
import { ParticipationActivityTable } from '../../../core/interfaces/participationActivity/participationActivityTable.interface';
import { ParticipationActivitiesTable } from '../../../components/ParticipationActivitiesTable/ParticipationActivitiesTable';
import styles from './ParticipationActivities.module.css';
import { Button } from 'antd';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import Headling from '../../../components/Headling/Headling';
import { Role } from '../../../core/enums/role.enum';
import { useParticipationActivityRepository } from '../../../repositories/useParticipationActivityRepository';

export function ParticipationActivities() {
	const [participationActivities, setParticipationActivities] = useState<ParticipationActivityTable[]>();
	const { role } = useSelector((s: RootState) => s.user);
	const { id } = useParams();
	const {getParticipationActivities, addParticipationActivity} = useParticipationActivityRepository();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			const activities = await getParticipationActivities();
			setParticipationActivities(activities);
		};
		fetchData();
	}, [id]);

	const onAddParticipationActivity = async () => {
		const id = await addParticipationActivity();
		console.log('id', id);
		if (id != undefined) {
			navigate(`/participationActivities/${id}`);
		}
	};

	return (
		<div className={styles['participation-activities-page']}>
			<Headling>{role === Role.Student ? 'Ваши участия в мероприятях' : 'Ваши проверки'}</Headling>
			{
				role === Role.Student
					? <Button className={styles['add-button']} onClick={onAddParticipationActivity}>Добавить участие в мероприятии</Button>
					: <></>
			}
			<ParticipationActivitiesTable participationActivities={participationActivities} />
			<Outlet />
		</div>
	);
}