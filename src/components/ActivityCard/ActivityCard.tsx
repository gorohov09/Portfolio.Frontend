import { Link } from 'react-router-dom';
import styles from './ActivityCard.module.css';
import { ActivityCardProps } from './ActivityCard.props';


export function ActivityCard({activity}: ActivityCardProps) {
	
	return (
		<Link to={'/activities/1}'} className={styles['link']}>
			<div className={styles['card']}>
				<div className={styles['head']}>
					<div className={styles['section']}>
						<span>Научная и учебная деятельность</span>
					</div>
					<div className={styles['type']}>
						<span>Олимпиада</span>
					</div>
					<div className={styles['level']}>
						<span>Университетское</span>
					</div>
				</div>
				<div className={styles['footer']}>
					<div className={styles['title']}>Олимпиада по истории</div>
				</div>
			</div>
		</Link>
	);
}