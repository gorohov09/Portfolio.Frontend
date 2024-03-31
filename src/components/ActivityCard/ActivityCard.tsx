import { Link } from 'react-router-dom';
import styles from './ActivityCard.module.css';
import { ActivityCardProps } from './ActivityCard.props';
import { getActivitySectionToString } from '../../core/enums/activity/activitySection.enum';
import { getActivityTypeToString } from '../../core/enums/activity/activityType.enum';
import { getActivityLevelToString } from '../../core/enums/activity/activityLevel.enum';


export function ActivityCard({activity}: ActivityCardProps) {
	
	return (
		<Link to={`/activities/${activity?.id}`} className={styles['link']}>
			<div className={styles['card']}>
				<div className={styles['head']}>
					<div className={styles['section']}>
						<span>{getActivitySectionToString(activity?.section)}</span>
					</div>
					<div className={styles['type']}>
						<span>{getActivityTypeToString(activity?.type)}</span>
					</div>
					<div className={styles['level']}>
						<span>{getActivityLevelToString(activity?.level)}</span>
					</div>
				</div>
				<div className={styles['footer']}>
					<div className={styles['title']}>{activity?.name}</div>
				</div>
			</div>
		</Link>
	);
}