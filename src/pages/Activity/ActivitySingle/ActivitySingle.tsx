import { useEffect, useState } from 'react';
import Headling from '../../../components/Headling/Headling';
import styles from './ActivitySingle.module.css';
import { Activity } from '../../../core/interfaces/activities/activity.interface';
import { useNavigate, useParams } from 'react-router-dom';
import { getActivitySectionToString } from '../../../core/enums/activity/activitySection.enum';
import { getActivityTypeToString } from '../../../core/enums/activity/activityType.enum';
import { getActivityLevelToString } from '../../../core/enums/activity/activityLevel.enum';
import { Button } from 'antd';
import { Role } from '../../../core/enums/role.enum';
import { useActivityRepository } from '../../../repositories/useActivityRepository';
import { useParticipationActivityRepository } from '../../../repositories/useParticipationActivityRepository';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

export function ActivitySingle() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [activity, setActivity] = useState<Activity>();
	const {role} = useSelector((s: RootState) => s.user);
	const { getActivityById } = useActivityRepository();
	const { addParticipationActivity } = useParticipationActivityRepository();

	useEffect(() => {
		const getActivity = async () => {
			const data = await getActivityById(id);
			setActivity(data);
		};
		getActivity();
	}, []);

	const startDate = activity?.period.startDate 
		? new Date(activity?.period.startDate).toLocaleString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' }) 
		: '';

	const endDate = activity?.period.endDate 
		? new Date(activity?.period.endDate).toLocaleString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' }) 
		: '';

	const navigateUrl = role == Role.Manager ? '/admin/activities' : '/activities';

	return (
		<div className={styles['activity-single-page']}>
			<div className={styles['header']}>
				<Headling>{activity?.name}</Headling>
			</div>
			<div className={styles['information-block']}>
				<div>
					<p><b>Направление: </b> {getActivitySectionToString(activity?.section)}</p>
				</div>
				<div>
					<p><b>Вид мероприятия: </b> {getActivityTypeToString(activity?.type)}</p>
				</div>
				<div>
					<p><b>Уровень: </b> {getActivityLevelToString(activity?.level)}</p>
				</div>
				<div>
					<p>
						<b>Даты проведения: </b>
						{
							activity?.period.isOneDay
								? <>{startDate}</>
								: <>С {startDate} по {endDate}</>
						}
					</p>
				</div>
				<div>
					<p><b>Место: </b> {activity?.location}</p>
				</div>
				<div>
					<p><b>Ссылка: </b> {activity?.link}</p>
				</div>
				<div>
					<p><b>Описание: </b> {activity?.description}</p>
				</div>
			</div>

			<div className={styles['links']}>
				<Button className={styles['button']} onClick={() => navigate(navigateUrl)}>Вернуться к мероприятиям</Button>
				{
					role === Role.Student
						? 
						<>
							<Button className={styles['button']} onClick={() => addParticipationActivity(id ? id : null)}>Подать заявку на участие</Button>
						</>
						:
						<>
							<Button className={styles['button']}>Редакировать</Button>
						</>
				}
				
			</div>
		</div>
	);
}