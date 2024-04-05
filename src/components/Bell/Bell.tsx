import styles from './Bell.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
	BellTwoTone
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

export function Bell() {
	const jwt = useSelector((s: RootState) => s.user.jwt);
	const [countNotification, setCountNotification] = useState<number>(0);

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
			setCountNotification((countNotification) => countNotification + 1);
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
				countNotification > 0
					?
					<>
						<div className={styles['circle']}>
							<span>{countNotification}</span>
						</div>
					</>
					:
					<>
					</>
			}
		</div>
	);
}