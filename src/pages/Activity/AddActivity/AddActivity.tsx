import { useNavigate } from 'react-router-dom';
import styles from './AddActivity.module.css';
import { useState } from 'react';
import Headling from '../../../components/Headling/Headling';
import { Button, Input, Select } from 'antd';
import { ActivitySection } from '../../../core/enums/activity/activitySection.enum';
import { ActivityType } from '../../../core/enums/activity/activityType.enum';
import { ActivityLevel } from '../../../core/enums/activity/activityLevel.enum';
import TextArea from 'antd/es/input/TextArea';
import { useActivityRepository } from '../../../repositories/useActivityRepository';

export type ActivityInformationPost = {
    name: string | null | undefined;
    section: ActivitySection | null | undefined,
    type: ActivityType | null | undefined,
    level: ActivityLevel | null | undefined,
    startDate: string | null | undefined,
    endDate: string | null | undefined,
    location: string | null | undefined,
    link: string | null | undefined,
    description: string | null | undefined,
}

const activitySectionsOptions = [
	{
		label: 'Научная и учебная деятельность',
		value: ActivitySection.ScientificAndEducational
	}
];

const activityTypesOptions = [
	{
		label: 'Олимпиада',
		value: ActivityType.Olympiad
	},
	{
		label: 'Конференция',
		value: ActivityType.Сonference
	}
];

const activityLevelsOptions = [
	{
		label: 'Университетское',
		value: ActivityLevel.University
	},
	{
		label: 'Городское',
		value: ActivityLevel.Municipal
	},
	{
		label: 'Региональное',
		value: ActivityLevel.Regional
	},
	{
		label: 'Всероссийское',
		value: ActivityLevel.Country
	},
	{
		label: 'Международное',
		value: ActivityLevel.International
	}
];


export function AddActivity() {
	const navigate = useNavigate();
	const [activity, setActivity] = useState<ActivityInformationPost>({
		name: null,
		section: null,
		type: null,
		startDate: null,
		endDate: null,
		description: null,
		level: null,
		link: null,
		location: null
	});
	const {saveActivity} = useActivityRepository();

	const onChangeActivitySection = (value: ActivitySection) => {
		if (activity === undefined) {
			return;
		}

		setActivity({
			...activity,
			section: value
		});
	};

	const onChangeActivityType = (value: ActivityType) => {
		if (activity === undefined) {
			return;
		}

		setActivity({
			...activity,
			type: value
		});
	};

	const onChangeActivityLevel = (value: ActivityLevel) => {
		if (activity === undefined) {
			return;
		}

		setActivity({
			...activity,
			level: value
		});
	};

	const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (activity === undefined) {
			return;
		}

		setActivity({
			...activity,
			name: e.target.value
		});
	};

	const onChangeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (activity === undefined) {
			return;
		}

		setActivity({
			...activity,
			startDate: e.target.value
		});
	};

	const onChangeEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (activity === undefined) {
			return;
		}

		setActivity({
			...activity,
			endDate: e.target.value
		});
	};

	const onChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (activity === undefined) {
			return;
		}

		setActivity({
			...activity,
			location: e.target.value
		});
	};

	const onChangeLink = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (activity === undefined) {
			return;
		}

		setActivity({
			...activity,
			link: e.target.value
		});
	};

	const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (activity === undefined) {
			return;
		}

		setActivity({
			...activity,
			description: e.target.value
		});
	};

	const onSave = async () => {
		if (activity == undefined) {
			return;
		}

		await saveActivity(activity);
		navigate('/admin/activities');
	};

	return (
		<div className={styles['add-activity']}>
			<Headling>Создание мероприятия</Headling>
			<div className={styles['form']}>
				<div className={styles['field']}>
					<label>Направление мероприятия</label>
					<Select
						value={activity?.section}
						style={{
							width: 300
						}}
						onChange={onChangeActivitySection}
						options={activitySectionsOptions}
					/>
				</div>

				<div className={styles['field']}>
					<label>Вид мероприятия</label>
					<Select
						value={activity?.type}
						style={{
							width: 300
						}}
						onChange={onChangeActivityType}
						options={activityTypesOptions}
					/>
				</div>

				<div className={styles['field']}>
					<label>Уровень мероприятия</label>
					<Select
						value={activity?.level}
						style={{
							width: 300
						}}
						onChange={onChangeActivityLevel}
						options={activityLevelsOptions}
					/>
				</div>

				<div className={styles['field']}>
					<label>Название</label>
					<Input onChange={onChangeName} 
						className={styles['input']} 
						placeholder='Название' 
						value={activity?.name ? activity.name : ''}/>
				</div>

				<div className={styles['field']}>
					<label>Дата начала</label>
					<Input onChange={onChangeStartDate} 
						className={styles['input']} 
						placeholder='Дата начала' 
						value={activity?.startDate ? activity.startDate : ''}/>
				</div>

				<div className={styles['field']}>
					<label>Дата окончания</label>
					<Input onChange={onChangeEndDate} 
						className={styles['input']} 
						placeholder='Дата окончания' 
						value={activity?.endDate ? activity.endDate : ''}/>
				</div>

				<div className={styles['field']}>
					<label>Ссылка на официальный сайт</label>
					<Input onChange={onChangeLink} 
						className={styles['input']} 
						placeholder='Ссылка на официальный сайт' 
						value={activity?.link ? activity.link : ''}/>
				</div>

				<div className={styles['field']}>
					<label>Место мероприятия</label>
					<Input onChange={onChangeLocation} 
						className={styles['input']} 
						placeholder='Место мероприятия' 
						value={activity?.location ? activity.location : ''}/>
				</div>

				<div className={styles['field']}>
					<label>Описание</label>
					<TextArea value={activity?.description ? activity.description : ''} 
						rows={5} 
						placeholder="Описание" 
						maxLength={1000} 
						onChange={onChangeDescription}/>
				</div>
			</div>
			
			<div className={styles['links']}>
				<Button className={styles['button']} onClick={onSave}>Создать</Button>
				<Button className={styles['button']} onClick={() => navigate('/admin/activities')}>Вернуться к мероприятиям</Button>
			</div>
		</div>
	);
}