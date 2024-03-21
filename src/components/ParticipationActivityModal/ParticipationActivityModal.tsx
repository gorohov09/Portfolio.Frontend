import { ParticipationActivityModalProps } from './ParticipationActivityModal.props';
import { useNavigate } from 'react-router-dom';
import { getParticipationActivityStatusToString } from '../../core/enums/participationActivity/participationActivityStatus.enum';
import styles from './ParticipationActivityModal.module.css';


export function ParticipationActivityModal({ participationActivity }: ParticipationActivityModalProps) {
	const navigate = useNavigate();
    
	return (
		<div className={styles['participation-activity-modal'] } onClick={() => navigate('/participationActivities')}>
			<div className={styles['participation-activity-modal-content']} 
				onClick={e => e.stopPropagation()}>
				<div className={styles['participation-activity-status-block']}>
					<span>{getParticipationActivityStatusToString(participationActivity ? participationActivity.status : '')}</span>
				</div>
			</div>
		</div>
	);
}