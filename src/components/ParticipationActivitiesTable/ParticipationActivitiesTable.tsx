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
    status: string;
    result: string;
    date: string;
    creationDate: string;
    updateDate: string;
}

const columns: TableProps<ParticipationActivityTableDataType>['columns'] = [
	{
		title: '#',
		dataIndex: 'id',
		key: 'id',
		render: (id) => <Link to={`${id}`}>Перейти</Link>
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
			status: getParticipationActivityStatusToString(item.status),
			result: getParticipationActivityResultToString(item.result),
			date: item.date ? item.date.split('T')[0] : '',
			creationDate: item.creationDate.split('T')[0],
			updateDate: item.updateDate.split('T')[0]
		}));
		setData(data);
	}, [participationActivities]);

	console.log(data);
    
	return (
		<div className={styles['participation-activities-table']}>
			<Table columns={columns} dataSource={data} />
		</div>
	);
}