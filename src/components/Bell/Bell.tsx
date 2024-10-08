import styles from './Bell.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import {
	BellTwoTone
} from '@ant-design/icons';
import { useEffect } from 'react';
import * as signalR from '@microsoft/signalr';
import { addUserCountNotification, removeUserCountNotification } from '../../store/slices/user.slice';
import { addNotification } from '../../store/slices/notification.slice';

export function Bell() {
	const { notificationCount, jwt } = useSelector((s: RootState) => s.user);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		let hubUrl = 'http://localhost:5205/notifications';

		if (jwt) {
			hubUrl += '?authToken' +'=' + jwt;
		}

		const connection = new signalR.HubConnectionBuilder()
			.withUrl(hubUrl)
			.configureLogging(signalR.LogLevel.Information)
			.build();

		connection.start()
			.then(() => console.log('Подключение к SignalR успешно'))
			.catch(err => console.error('При подклбчении произошла ошибка: ', err));

		connection.on('Notifications', (args) => {
			console.log(args);
			dispatch(addUserCountNotification({count: notificationCount + 1}));
			dispatch(addNotification({notification: {id: args.id, title: args.title, description: args.description, creationDate: args.creationDate}}));
		});

		connection.on('NotificationsRead', (args) => {
			dispatch(removeUserCountNotification({count: args}));
		});

		return () => {
			connection.stop()
				.then(() => console.log('Отключение от SignalR'))
				.catch(err => console.error(err));
		};
	}, []);

	return (
		<div className={styles['bell']}>
			<BellTwoTone className={styles['item-icon']}/>
			{
				notificationCount > 0
					?
					<>
						<div className={styles['circle']}>
							<span>{notificationCount}</span>
						</div>
					</>
					:
					<>
					</>
			}
		</div>
	);
}