import { ParticipationActivityModalProps } from './ParticipationActivityModal.props';
import { useNavigate } from 'react-router-dom';
import styles from './ParticipationActivityModal.module.css';
import { DatePicker, DatePickerProps, Select, Button, Modal, Tag, ConfigProvider } from 'antd';
import { ParticipationActivityResult } from '../../core/enums/participationActivity/participationActivityResult.enum';
import dayjs from 'dayjs';
import TextArea from 'antd/es/input/TextArea';
import { FileUploader } from '../FileUploader/FileUploader';
import { File } from '../../core/interfaces/file.interface';
import { ParticipationActivityStatus, getColorStatus, getParticipationActivityStatusToString } from '../../core/enums/participationActivity/participationActivityStatus.enum';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Role } from '../../core/enums/role.enum';
import { Guid } from 'guid-typescript';
import { useEffect, useState } from 'react';
import { Activity, ParticipationActivity } from '../../core/interfaces/participationActivity/participationActivity.interface';
import { useParticipationActivityRepository } from '../../repositories/useParticipationActivityRepository';
import locale from 'antd/locale/ru_RU';
import ModalInput from '../ModalInput/ModalInput';

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
	setParticipationActivity }: ParticipationActivityModalProps) {

	const navigate = useNavigate();
	const role = useSelector((s: RootState) => s.user.role) as Role;
	const {saveParticipationActivity, 
		submitParticipationActivity, 
		sendRevisionParticipationActivity, 
		confirmParticipationActivity} = useParticipationActivityRepository();

	const [comment, setComment] = useState<string>();
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

		const id = value as unknown as Guid;
		const name = activityNamesOptions?.find(el => el.value === id)?.label;
		const activity: Activity = {
			id: id,
			name: name ? name : ''
		};

		setParticipationActivity({
			...participationActivity,
			activity: activity
		});
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

	async function handleSave(activity: ParticipationActivity) {
		const success = await saveParticipationActivity(activity);

		if (success) {
			Modal.success({
				content: 'Успешно сохранено!'
			});
		}
	}
	
	async function handleSubmit(activity: ParticipationActivity) {
		const success = await submitParticipationActivity(activity.id.toString());

		if (success) {
			setParticipationActivity({
				...activity,
				status: ParticipationActivityStatus.Submitted
			});

			Modal.success({
				content: 'Участие в мероприятии успешно подано!'
			});
		}
	}

	async function handleSendRevision(activity: ParticipationActivity | undefined) {

		if (activity === undefined) {
			return;
		}

		const success = await sendRevisionParticipationActivity(activity.id.toString(), comment);
		if (success) {
			setParticipationActivity({
				...activity,
				status: ParticipationActivityStatus.SentRevision
			});

			Modal.success({
				content: 'Участие в мероприятии успешно отправлено на доработку!'
			});
		}
	}

	async function handleConfirm(activity: ParticipationActivity) {
		const success = await confirmParticipationActivity(activity.id.toString());
		if (success) {
			setParticipationActivity({
				...activity,
				status: ParticipationActivityStatus.Approved
			});

			Modal.success({
				content: 'Участие в мероприятии успешно одобрено!'
			});
		}
	}

	const showModal = () => {
		setIsModalOpen(true);
	};

	const renderButtons = () => {
		const buttons = [];

		if (role == Role.Student) {
			if (participationActivity?.status === ParticipationActivityStatus.Draft) {
				buttons.push(<Button className="button" onClick={() => handleSave(participationActivity)}>Сохранить</Button>);
				buttons.push(<Button className="button" onClick={() => handleSubmit(participationActivity)}>Подать</Button>);
			}
			if (participationActivity?.status === ParticipationActivityStatus.SentRevision) {
				buttons.push(<Button className="button" onClick={() => handleSave(participationActivity)}>Сохранить</Button>);
				buttons.push(<Button className="button" onClick={() => handleSubmit(participationActivity)}>Подать</Button>);
			}
		}
		else if (role == Role.Manager) {
			if (participationActivity?.status === ParticipationActivityStatus.Submitted) {
				buttons.push(<Button className="button" onClick={showModal}>Отклонить</Button>);
				buttons.push(<Button className="button" onClick={() => handleConfirm(participationActivity)}>Одобрить</Button>);
			}
		}

		return buttons;
	};

	const navigateUrl = role == Role.Student ? '/participationActivities' : '/admin/participationActivities';
	const status = getParticipationActivityStatusToString(participationActivity?.status);
    
	return (
		<div className={styles['participation-activity-modal'] } onClick={() => navigate(navigateUrl)}>
			<div className={styles['participation-activity-modal-content']} 
				onClick={e => e.stopPropagation()}>

				<ModalInput 
					setIsModalOpen={setIsModalOpen} 
					setComment={setComment} 
					comment={comment} 
					isModalOpen={isModalOpen} 
					sendOnRevision={() => handleSendRevision(participationActivity)}/>
				<div className={styles['participation-activity-status-block']}>
					<Tag style={{ fontSize: '15px', fontWeight: 'bold' }} color={getColorStatus(status)}><span>{status}</span></Tag>
					{participationActivity?.comment && participationActivity.status == ParticipationActivityStatus.SentRevision && role == Role.Student
						? <span className={styles['participation-activity-comment']}>({participationActivity.comment})</span>
						: <></>}
				</div>

				<div className={styles['form']}>
					<div className={styles['field']}>
						<label>Выберите мероприятие, в котором участвовали</label>
						<Select
							disabled={!participationActivity?.canEdit}
							value={participationActivity?.activity ? {
								label: participationActivity?.activity.name,
								value: participationActivity?.activity.id
							} : null}
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
						<ConfigProvider locale={locale}>
							<DatePicker disabled={!participationActivity?.canEdit} 
								value={participationActivity?.date ? dayjs(participationActivity?.date) : null}
								onChange={onChangeDate}
							/>
						</ConfigProvider>
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