import { Button, Tag } from 'antd';
import styles from './NotificationCard.module.css';
import { NotificationCardProps } from './NotificationCard.props';
import { useEffect, useState } from 'react';
import { Notification } from '../../core/interfaces/notification/notification.interface';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export function NotificationCard({notification}: NotificationCardProps) {

	const jwt = useSelector((s: RootState) => s.user.jwt);
	const [notificationState, setNotificationState] = useState<Notification>();

	useEffect(() => {
		setNotificationState({
			id: notification.id,
			title: notification.title,
			description: notification.description,
			isRead: notification.isRead,
			creationDate: notification.creationDate
		});
	}, []);

	const onReadNotification = async () => {
		if (notificationState === undefined)
			return;

		await axios.post(`${PREFIX}/Notification/MarkAsRead`, {
			ids: [notificationState.id]
		}, {
			headers: {
				'Authorization': `Bearer ${jwt}`
			}
		});

		setNotificationState({
			...notificationState,
			isRead: true
		});
	};

	const creationDate = notificationState?.creationDate 
		? new Date(notification.creationDate).toLocaleString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' }) 
		: '';

	console.log(notificationState);
	
	return (
		<div className={styles['card']}>
			<div className={styles['creation-date']}>
				{
					notificationState?.isRead
						? <Tag color="#87d068">Прочитано</Tag>
						: <Tag color="#f50">Не прочитано</Tag>
				}
			</div>
			<div className={styles['creation-date']}>
				<span>Дата: <b>{creationDate}</b></span>
			</div>
			<div className={styles['description']}>
				<span>Тема: <b>{notificationState?.description}</b></span>
			</div>
			<div className={styles['button-read']}>
				{
					notificationState?.isRead
						? <></>
						: <Button onClick={onReadNotification}>Прочитать</Button>
				}
			</div>
		</div>
	);
}