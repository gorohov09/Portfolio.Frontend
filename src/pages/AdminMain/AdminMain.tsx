import { NotificationCard } from '../../components/NotificationCard/NotificationCard';

export function AdminMain() {

    
	return (
		<div>
			<p>Основная инфа для админа</p>

			<NotificationCard notification={{
				id: null,
				isRead: false,
				title: 'На Вас назначена проверка',
				description: 'На Вас назначена проверка. Проверьте раздел - Проверки',
				creationDate: '2024-04-05T14:52:54.911024Z'

			}}/>
		</div>
	);
}