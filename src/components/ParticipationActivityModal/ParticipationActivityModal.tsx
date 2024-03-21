import { ParticipationActivityModalProps } from './ParticipationActivityModal.props';
import { useNavigate } from 'react-router-dom';
import styles from './ParticipationActivityModal.module.css';
import { DatePicker, DatePickerProps, Select } from 'antd';
import { ParticipationActivityResult } from '../../core/enums/participationActivity/participationActivityResult.enum';
import dayjs from 'dayjs';
import TextArea from 'antd/es/input/TextArea';
import { FileUploader } from '../FileUploader/FileUploader';
import { File } from '../../core/interfaces/file.interface';

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


export function ParticipationActivityModal({ participationActivity, setParticipationActivity }: ParticipationActivityModalProps) {
	const navigate = useNavigate();

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
    
	return (
		<div className={styles['participation-activity-modal'] } onClick={() => navigate('/participationActivities')}>
			<div className={styles['participation-activity-modal-content']} 
				onClick={e => e.stopPropagation()}>

				<div className={styles['participation-activity-status-block']}>
					<span>Подано</span>
				</div>

				<div className="participation-activity-information-block">

					<div className="participation-activity-information-block-item">
						<div className="participation-activity-information-block-item-helper">
							<span>Выберите результат участия</span>
						</div>

						<div className="participation-activity-information-block-item-element">
							<Select
								disabled={participationActivity?.canEdit}
								value={participationActivity?.result}
								style={{
									width: 300
								}}
								onChange={onChangeResult}
								options={participationActivityResults}
							/>
						</div>
					</div>

					<div className="participation-activity-information-block-item">
						<div className="participation-activity-information-block-item-helper">
							<span>Выберите дату участия</span>
						</div>

						<div className="participation-activity-information-block-item-element">
							<DatePicker disabled={participationActivity?.canEdit} 
								value={dayjs(participationActivity?.date)}
								onChange={onChangeDate} />
						</div>
					</div>

					<div className="participation-activity-information-block-item">
						<div className="participation-activity-information-block-item-helper">
							<span>Опишите свое участие</span>
						</div>

						<div className="participation-activity-information-block-item-element">
							<TextArea disabled={participationActivity?.canEdit} value={participationActivity?.description} 
								rows={5} 
								placeholder="Опишите..." 
								maxLength={1000} 
								onChange={onChangeDescription}/>
						</div>
					</div>

					<div className="participation-activity-information-block-item">
						<div className="participation-activity-information-block-item-helper">
							<span>Загрузите файл подтверждающий участие</span>
						</div>

						<FileUploader 
							file={participationActivity?.document} bucket={2} 
							setFile={onChangeFile}
							isDisabled={participationActivity ? participationActivity.canEdit : false}/>
					</div>
				</div>
			</div>
		</div>
	);
}