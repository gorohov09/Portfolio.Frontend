import { useEffect, useState } from 'react';
import { NotificationBaseResponse } from '../../core/interfaces/notification/notificationBaseResponse.interface';
import { PREFIX } from '../../helpers/API';
import styles from './Notification.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../../store/slices/user.slice';
import { NotificationCard } from '../../components/NotificationCard/NotificationCard';
import { Notification } from '../../core/interfaces/notification/notification.interface';
import Headling from '../../components/Headling/Headling';

export function Notifications() {
	const navigate = useNavigate();
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const { jwt } = useSelector((s: RootState) => s.user);
	const dispatch = useDispatch<AppDispatch>();

	const getNotifications = async () => {
		try {
			const {data} = await axios.get<NotificationBaseResponse>(`${PREFIX}/Notification/list`, {
				headers: {
					'Authorization': `Bearer ${jwt}`
				}
			});
			setNotifications(data.entities);
		} catch (e) {
			if (e instanceof AxiosError) {
				if (e.response?.status == 401) {
					dispatch(userActions.logout());
					navigate('/auth/login');
				}
			}
		}
	};

	useEffect(() => {
		getNotifications();
	}, []);
    
	return (
		<div className={styles['notifications-page']}>
			<div>
				<Headling>Уведомления</Headling>
			</div>
			<div className={styles['notifications']}>
				{
					notifications.map(el => (
						<NotificationCard notification={el} />
					))
				}
			</div>
		</div>
	);
}