import { useState, useEffect } from 'react';
import { ParticipationActivityTable } from '../../../core/interfaces/participationActivity/participationActivityTable.interface';
import { ParticipationActivitiesTable } from '../../../components/ParticipationActivitiesTable/ParticipationActivitiesTable';
import styles from './ParticipationActivities.module.css';
import { Button } from 'antd';
import { Outlet, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import Headling from '../../../components/Headling/Headling';
import { Role } from '../../../core/enums/role.enum';
import { ParticipationActivityRepository } from '../../../repositories/ParticipationActivityRepository';

export function ParticipationActivities() {
	const [participationActivities, setParticipationActivities] = useState<ParticipationActivityTable[]>();
	const { role } = useSelector((s: RootState) => s.user);
	const { id } = useParams();
	const repository = new ParticipationActivityRepository()

	useEffect(() => {
		const fetchData = async () => {
            const activities = await repository.getParticipationActivities();
            setParticipationActivities(activities);
        };
		fetchData();
	}, [id]);

	return (
		<div className={styles['participation-activities-page']}>
			<Headling>{role === Role.Student ? 'Ваши участия в мероприятях' : 'Ваши проверки'}</Headling>
			{
				role === Role.Student
					? <Button className={styles['add-button']} onClick={() => repository.addParticipationActivity()}>Добавить участие в мероприятии</Button>
					: <></>
			}
			<ParticipationActivitiesTable participationActivities={participationActivities} />
			<Outlet />
		</div>
	);
}