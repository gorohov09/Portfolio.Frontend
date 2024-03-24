import { Table, TableProps } from 'antd';
import styles from './ParticipationActivitiesTable.module.css';
import { ParticipationActivitiesTableProps } from './ParticipationActivitiesTable.props';
import { useEffect, useState } from 'react';
import { getParticipationActivityStatusToString } from '../../core/enums/participationActivity/participationActivityStatus.enum';
import { getParticipationActivityResultToString } from '../../core/enums/participationActivity/participationActivityResult.enum';
import { Guid } from 'guid-typescript';
import { Link } from 'react-router-dom';

interface ParticipationActivityTableDataType {
    id: Guid
	activity: ActivityTableDataType | null;
    status: string;
    result: string;
    date: string;
    creationDate: string;
    updateDate: string;
}

interface ActivityTableDataType {
	id: Guid;
	name: string;
}

const columns: TableProps<ParticipationActivityTableDataType>['columns'] = [
	{
		title: '#',
		dataIndex: 'id',
		key: 'id',
		render: (id) => <Link to={`${id}`}>Перейти</Link>
	},
	{
		title: 'Мероприятие',
		dataIndex: 'activity',
		key: 'activity',
		render: (activity) => activity ? <Link to={`/activities/${activity.id}`}>{activity.name}</Link> : <>Не заполнено</>
	},
	{
		title: 'Статус',
		dataIndex: 'status',
		key: 'status'
	},
	{
		title: 'Результат',
		dataIndex: 'result',
		key: 'result'
	},
	{
		title: 'Дата участия',
		dataIndex: 'date',
		key: 'date'
	},
	{
		title: 'Дата создания',
		dataIndex: 'creationDate',
		key: 'creationDate'
	},
	{
		title: 'Дата обновления',
		dataIndex: 'updateDate',
		key: 'updateDate'
	}
];

export function ParticipationActivitiesTable({ participationActivities }: ParticipationActivitiesTableProps) {
	const [data, setData] = useState<ParticipationActivityTableDataType[]>();

	useEffect(() => {
		const data = participationActivities.map<ParticipationActivityTableDataType>(item => ({
			id: item.id,
			activity: item.activity ? {
				id: item.activity.id,
				name: item.activity.name
			} : null,
			status: getParticipationActivityStatusToString(item.status),
			result: getParticipationActivityResultToString(item.result),
			date: item.date ? item.date.split('T')[0] : '',
			creationDate: item.creationDate.split('T')[0],
			updateDate: item.updateDate.split('T')[0]
		}));
		setData(data);
	}, [participationActivities]);
    
	return (
		<div className={styles['participation-activities-table']}>
			<Table columns={columns} dataSource={data} />
		</div>
	);
}