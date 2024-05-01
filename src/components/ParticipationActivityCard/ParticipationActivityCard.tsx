import { Button, Card } from 'antd';
import { ParticipationActivityCardProps } from './ParticipationActivityCard.props';
import styles from './ParticipationActivityCard.module.css';
import { getActivityTypeToString } from '../../core/enums/activity/activityType.enum';
import { getActivityLevelToString } from '../../core/enums/activity/activityLevel.enum';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { PREFIX } from '../../helpers/API';
import axios from 'axios';

const style = {
	width: 300, 
	height: 250
};

export function ParticipationActivityCard({title, date, type, level, fileId}: ParticipationActivityCardProps) {

	const user = useSelector((s: RootState) => s.user);

	const downloadFile = async () => {        
		try {
			const response = await axios.get(`${PREFIX}/File/${fileId}/Download`, {
				responseType: 'blob',
				headers: {
					'Authorization': `Bearer ${user.jwt}`
				}
			});

			const name = `${title}_${user.fullName}.pdf`;

			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', name);
			document.body.appendChild(link);
			link.click();
		} catch (error) {
			console.error('Ошибка при загрузке файла:', error);
		}
	};

	const dateString = date ? new Date(date).toLocaleString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

	return (
		<div>
			<Card title={title} bordered={false} style={style}>
				<div className={styles['info']}>
					<p>{getActivityTypeToString(type)}</p>
					<p>{getActivityLevelToString(level)}</p>
					<p>Дата участия: {dateString}</p>
					<Button onClick={downloadFile}>Подтверждающий документ</Button>
				</div>
			</Card>
		</div>
	);
}