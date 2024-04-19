import { useEffect } from 'react';
import { PREFIX } from '../../helpers/API';
import styles from './Notification.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../../store/slices/user.slice';
import { NotificationCard } from '../../components/NotificationCard/NotificationCard';
import Headling from '../../components/Headling/Headling';
import { Button } from 'antd';
import { getNotificationList } from '../../store/slices/notification.slice';

export function Notifications() {
	const navigate = useNavigate();
	const { jwt } = useSelector((s: RootState) => s.user);
	const dispatch = useDispatch<AppDispatch>();
	const { notificationList } = useSelector((s: RootState) => s.notificationList);

	const getNotifications = async () => {
		try {
			dispatch(getNotificationList({jwt: jwt}));
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

	const onReadAllNotifications = async () => {
		if (notificationList === undefined)
			return;

		await axios.post(`${PREFIX}/Notification/MarkAsRead`, {
			ids: notificationList.filter(x => !x.isRead).map(el => el.id)
		}, {
			headers: {
				'Authorization': `Bearer ${jwt}`
			}
		});

		await getNotifications();
	};
    
	return (
		<div className={styles['notifications-page']}>
			<div>
				<Headling>Уведомления</Headling>
				<Button className={styles['button']} onClick={onReadAllNotifications}>Прочитать все</Button>
			</div>
			<div className={styles['notifications']}>
				{
					notificationList.map(el => (
						<NotificationCard notification={el} />
					))
				}
			</div>
		</div>
	);
}