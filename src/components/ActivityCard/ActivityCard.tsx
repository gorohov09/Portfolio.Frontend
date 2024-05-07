import { NavLink } from 'react-router-dom';
import styles from './ActivityCard.module.css';
import { ActivityCardProps } from './ActivityCard.props';
import { getActivitySectionToString } from '../../core/enums/activity/activitySection.enum';
import { getActivityTypeToString } from '../../core/enums/activity/activityType.enum';
import { getActivityLevelToString } from '../../core/enums/activity/activityLevel.enum';


export function ActivityCard({activity, isAdmin}: ActivityCardProps) {
	
	return (
		<div className={styles['activity-card']}>
			<div className={styles['header']}>
				<NavLink to={isAdmin ? `/admin/activities/${activity?.id}` : `/activities/${activity?.id}`}>
					<p>{activity?.name}</p>
				</NavLink>
			</div>
			<div className={styles['body']}>
				<div className={styles['left']}>
					<p>{getActivitySectionToString(activity?.section)}</p>
					<p>{getActivityTypeToString(activity?.type)}</p>
				</div>
				<div className={styles['right']}>
					<p>{getActivityLevelToString(activity?.level)}</p>
				</div>
			</div>
		</div>
	);
}