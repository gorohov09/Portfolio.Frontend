import { useEffect, useState } from 'react';
import { Activity } from '../../../core/interfaces/activities/activity.interface';
import styles from './SearchActivity.module.css';
import { useNavigate } from 'react-router-dom';
import { ActivityCard } from '../../../components/ActivityCard/ActivityCard';
import { Button, Input, Select } from 'antd';
import { Role } from '../../../core/enums/role.enum';
import { useActivityRepository } from '../../../repositories/useActivityRepository';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { ActivityType } from '../../../core/enums/activity/activityType.enum';
import { ActivitySection } from '../../../core/enums/activity/activitySection.enum';
import { ActivityLevel } from '../../../core/enums/activity/activityLevel.enum';

const activityTypeOptions = [
	{
		label: 'Олимпиада',
		value: 1
	},
	{
		label: 'Конференция',
		value: 2
	}
];

const activitySectionOptions = [
	{
		label: 'Научная и учебная деятельность',
		value: 1
	}
];

const activityLevelOptions = [
	{
		label: 'Университетское',
		value: 1
	},
	{
		label: 'Городское',
		value: 2
	},
	{
		label: 'Региональное',
		value: 3
	},
	{
		label: 'Всероссийское',
		value: 3
	},
	{
		label: 'Международное',
		value: 3
	}
];

export function SearchActivity() {
	const navigate = useNavigate();
	const {role} = useSelector((s: RootState) => s.user);
	const { getActivities } = useActivityRepository();

	const [type, setType] = useState<number>();
	const [section, setSection] = useState<number>();
	const [level, setLevel] = useState<number>();
	const [name, setName] = useState<string>();
	const [activities, setActivities] = useState<Activity[] | undefined>([]);

	useEffect(() => {
		const fetchData = async () => {
			const activities = await getActivities({
				type: type as ActivityType,
				section: section as ActivitySection,
				level: level as ActivityLevel,
				name: name
			});
			setActivities(activities);
		};
		fetchData();
	}, []);

	const getAct = async () => {
		const activities = await getActivities({
			type: type as ActivityType,
			section: section as ActivitySection,
			level: level as ActivityLevel,
			name: name
		});
		setActivities(activities);
	};

	const onChangeType = (value: number) => {
		setType(value);
	};

	const onChangeSection = (value: number) => {
		setSection(value);
	};

	const onChangeLevel = (value: number) => {
		setLevel(value);
	};

	const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	return (
		<div className={styles['main-search']}>
			<div className={styles['search']}>
				<div className={styles['filters']}>

					<div className={styles['field']}>
						<label>Выберите вид мероприятия</label>
						<Select
							value={section}
							style={{
								width: 300
							}}
							onChange={onChangeSection}
							options={activitySectionOptions}
						/>
					</div>

					<div className={styles['field']}>
						<label>Выберите тип мероприятия</label>
						<Select
							value={type}
							style={{
								width: 300
							}}
							onChange={onChangeType}
							options={activityTypeOptions}
						/>
					</div>

					<div className={styles['field']}>
						<label>Выберите уровень мероприятия</label>
						<Select
							value={level}
							style={{
								width: 300
							}}
							onChange={onChangeLevel}
							options={activityLevelOptions}
						/>
					</div>

					<div className={styles['field']}>
						<label>Введите название мероприятия</label>
						<Input value={name} 
							placeholder="Название" 
							onChange={onChangeName}/>
					</div>

				</div>
				<div className={styles['button']}>
					<Button onClick={() => getAct()}>Поиск</Button>
					{role == Role.Manager ? <><Button onClick={() => navigate('/admin/addActivity')}>Добавить мероприятие</Button></> : <></>}
				</div>
			</div>

			<div className={styles['activities']}>
				{
					activities != undefined && activities?.length > 0 
						?
						activities?.map(el => (
							<ActivityCard activity={el} isAdmin={role == Role.Manager}/>
						))
						:
						<p>Ничего не найдено</p>
				}
			</div>
		</div>
	);
}