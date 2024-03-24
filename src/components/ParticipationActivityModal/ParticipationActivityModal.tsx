import { ParticipationActivityModalProps } from './ParticipationActivityModal.props';
import { useNavigate } from 'react-router-dom';
import styles from './ParticipationActivityModal.module.css';
import { DatePicker, DatePickerProps, Select, Button } from 'antd';
import { ParticipationActivityResult } from '../../core/enums/participationActivity/participationActivityResult.enum';
import dayjs from 'dayjs';
import TextArea from 'antd/es/input/TextArea';
import { FileUploader } from '../FileUploader/FileUploader';
import { File } from '../../core/interfaces/file.interface';
import { ParticipationActivityStatus, getParticipationActivityStatusToString } from '../../core/enums/participationActivity/participationActivityStatus.enum';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Role } from '../../core/enums/role.enum';
import { Guid } from 'guid-typescript';
import { useEffect } from 'react';

const participationActivityResults = [
	{
		label: 'Участник',
		value: ParticipationActivityResult.Participant
	},
	{
		label: 'Призер',
		value: ParticipationActivityResult.Laureate
	},
	{
		label: 'Победитель',
		value: ParticipationActivityResult.Winner
	}
];

type ActivityNameOption = {
	label: string;
	value: Guid
}

let activityNamesOptions: ActivityNameOption[] | undefined = [];


export function ParticipationActivityModal({ 
	participationActivity, 
	activityNames,
	setParticipationActivity, 
	onSaveParticipationActivity,
	onSubmitParticipationActivity }: ParticipationActivityModalProps) {

	const navigate = useNavigate();
	const role = useSelector((s: RootState) => s.user.role) as Role;

	useEffect(() => {
		activityNamesOptions = activityNames?.map<ActivityNameOption>(el => {
			return {
				label: el.name,
				value: el.id
			};
		});
	}, [activityNames]);

	const onChangeActivity = (value: ActivityNameOption) => {
		if (participationActivity === undefined) {
			return;
		}

		console.log(value);
	};

	const onChangeResult = (value: ParticipationActivityResult) => {
		if (participationActivity === undefined) {
			return;
		}

		setParticipationActivity({
			...participationActivity,
			result: value
		});
	};

	const onChangeDate: DatePickerProps['onChange'] = (date) => {
		if (participationActivity === undefined) {
			return;
		}

		setParticipationActivity({
			...participationActivity,
			date: date.toISOString()
		});
	};

	const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (participationActivity === undefined) {
			return;
		}

		setParticipationActivity({
			...participationActivity,
			description: e.target.value
		});
	};

	const onChangeFile = (file: File) => {
		if (participationActivity === undefined) {
			return;
		}

		setParticipationActivity({
			...participationActivity,
			document: file
		});
	};

	const renderButtons = () => {
		const buttons = [];

		if (role == Role.Student) {
			if (participationActivity?.status === ParticipationActivityStatus.Draft) {
				buttons.push(<Button className="button" onClick={onSaveParticipationActivity}>Сохранить</Button>);
				buttons.push(<Button className="button" onClick={onSubmitParticipationActivity}>Подать</Button>);
			}
			if (participationActivity?.status === ParticipationActivityStatus.SentRevision) {
				buttons.push(<Button className="button" onClick={onSaveParticipationActivity}>Сохранить</Button>);
				buttons.push(<Button className="button" onClick={onSubmitParticipationActivity}>Подать</Button>);
			}
		}

		return buttons;
	};

	console.log(activityNamesOptions);
    
	return (
		<div className={styles['participation-activity-modal'] } onClick={() => navigate('/participationActivities')}>
			<div className={styles['participation-activity-modal-content']} 
				onClick={e => e.stopPropagation()}>

				<div className={styles['participation-activity-status-block']}>
					<span>{getParticipationActivityStatusToString(participationActivity?.status)} </span>
					{participationActivity?.comment && participationActivity.status == ParticipationActivityStatus.SentRevision
						? <span className={styles['participation-activity-comment']}>({participationActivity.comment})</span>
						: <></>}
				</div>

				<div className={styles['form']}>
					<div className={styles['field']}>
						<label>Выберите мероприятие, в котором участвовали</label>
						<Select
							disabled={!participationActivity?.canEdit}
							value={null}
							style={{
								width: 300
							}}
							onChange={onChangeActivity}
							options={activityNamesOptions}
						/>
					</div>
					<div className={styles['field']}>
						<label>Выберите результат участия</label>
						<Select
							disabled={!participationActivity?.canEdit}
							value={participationActivity?.result}
							style={{
								width: 300
							}}
							onChange={onChangeResult}
							options={participationActivityResults}
						/>
					</div>

					<div className={styles['field']}>
						<label>Выберите дату участия</label>
						<DatePicker disabled={!participationActivity?.canEdit} 
							value={participationActivity?.date ? dayjs(participationActivity?.date) : null}
							onChange={onChangeDate} />
					</div>

					<div className={styles['field']}>
						<label>Опишите свое участие</label>
						<TextArea disabled={!participationActivity?.canEdit} value={participationActivity?.description} 
							rows={5} 
							placeholder="Опишите..." 
							maxLength={1000} 
							onChange={onChangeDescription}/>
					</div>

					<div className={styles['field']}>
						<label>Загрузите файл подтверждающий участие</label>
						<FileUploader 
							file={participationActivity?.document} bucket={2} 
							setFile={onChangeFile}
							isDisabled={!participationActivity?.canEdit}/>
					</div>
				</div>

				<div className={styles['participation-activity-buttons']}>
					{renderButtons()}
				</div>
			</div>
		</div>
	);
}