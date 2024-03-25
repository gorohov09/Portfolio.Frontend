import { useNavigate } from 'react-router-dom';
import styles from './AddEducationInformation.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { useEffect, useState } from 'react';
import Headling from '../../../components/Headling/Headling';
import { Button, Input, Select } from 'antd';
import axios, { AxiosError } from 'axios';
import { Portfolio } from '../../../core/interfaces/portfolio/portfolio.interface';
import { PREFIX } from '../../../helpers/API';
import { EducationLevel } from '../../../core/enums/portfolio/educationLevel.enum';
import { Guid } from 'guid-typescript';
import { userActions } from '../../../store/slices/user.slice';

type EducationInformation = {
    educationLevel: EducationLevel | null;
    groupNumber: string | null;
    specialityNumber: string | null;
    facultyId: Guid | null;
}

type Faculty = {
    label: string;
    value: string;
}

const educationLevels = [
	{
		label: 'Бакалавриат',
		value: EducationLevel.Bachelor
	},
	{
		label: 'Специалитет',
		value: EducationLevel.Specialty
	},
	{
		label: 'Магистратура',
		value: EducationLevel.Magistracy
	},
	{
		label: 'Аспирантура',
		value: EducationLevel.Postgraduate
	}
];

const faculties: Faculty[] = [
	{
		label: 'Кафедра систем информационной безопасности',
		value: '8a691e62-cee0-b106-16dc-cbf4779e3377'
	},
	{
		label: 'Кафедра прикладной математики и информатики',
		value: '465e3684-3cd7-11c4-f90a-fef0dba3ff77'
	}
];

export function AddEducationInformation() {
	const navigate = useNavigate();
	const { jwt } = useSelector((s: RootState) => s.user);
	const [educationInformation, setEducationInformation] = useState<EducationInformation>();
	const dispatch = useDispatch<AppDispatch>();

	const getPortfolio = async () => {
		try {
			const {data} = await axios.get<Portfolio>(`${PREFIX}/Portfolio/MyPortfolio`, {
				headers: {
					'Authorization': `Bearer ${jwt}`
				}
			});
			setEducationInformation({
				educationLevel: data.educationLevel,
				groupNumber: data.groupNumber,
				specialityNumber: data.speciality ? data.speciality.number : null,
				facultyId: data.faculty ? data.faculty.id : null
			});
            
		} catch (e) {
			if (e instanceof AxiosError) {
				if (e.response?.status == 401) {
					dispatch(userActions.logout());
					navigate('/auth/login');
				}
			}
		}
	};


	useEffect(() => {
		getPortfolio();
	}, []);

	const onChangeEducationLevel = (value: EducationLevel) => {
		if (educationInformation === undefined) {
			return;
		}

		setEducationInformation({
			...educationInformation,
			educationLevel: value
		});
	};

	const onChangeFaculty = (value: Guid) => {
		if (educationInformation === undefined) {
			return;
		}

		setEducationInformation({
			...educationInformation,
			facultyId: value
		});
	};

	const onChangeSpeciality = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (educationInformation === undefined) {
			return;
		}

		setEducationInformation({
			...educationInformation,
			specialityNumber: e.target.value
		});
	};

	const onChangeGroup = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (educationInformation === undefined) {
			return;
		}

		setEducationInformation({
			...educationInformation,
			groupNumber: e.target.value
		});
	};

	const onSave = async () => {
		if (educationInformation == undefined) {
			return;
		}

		try {
			await axios.put(`${PREFIX}/Portfolio/Add/Education`, {
				educationLevel: educationInformation.educationLevel,
				groupNumber: educationInformation.groupNumber,
				specialityNumber: educationInformation.specialityNumber,
				facultyId: educationInformation.facultyId
			}, {
				headers: {
					'Authorization': `Bearer ${jwt}`
				}
			});

		} catch (e) {
			if (e instanceof AxiosError) {
				if (e.response?.status == 401) {
					dispatch(userActions.logout());
					navigate('/auth/login');
				}
			}
		}
	};

	return (
		<div className={styles['add-general-information']}>
			<Headling>Заполнение информации о себе</Headling>
			<div className={styles['form']}>
				<div className={styles['field']}>
					<label>Уровень образования</label>
					<Select
						value={educationInformation?.educationLevel}
						style={{
							width: 300
						}}
						onChange={onChangeEducationLevel}
						options={educationLevels}
					/>
				</div>
				<div className={styles['field']}>
					<label>Кафедра</label>
					<Select
						value={educationInformation?.facultyId}
						style={{
							width: 300
						}}
						onChange={onChangeFaculty}
						options={faculties}
					/>
				</div>
				<div className={styles['field']}>
					<label>Номер специальности</label>
					<Input onChange={onChangeSpeciality} 
						className={styles['input']} 
						placeholder='Номер специальности' 
						value={educationInformation?.specialityNumber ? educationInformation?.specialityNumber : ''}/>
				</div>
				<div className={styles['field']}>
					<label>Номер группы</label>
					<Input onChange={onChangeGroup} 
						className={styles['input']} 
						placeholder='Номер группы' 
						value={educationInformation?.groupNumber ? educationInformation?.groupNumber : ''}/>
				</div>
			</div>
			
			<div className={styles['links']}>
				<Button className={styles['button']} onClick={onSave}>Сохранить</Button>
				<Button className={styles['button']} onClick={() => navigate('/portfolio')}>Вернуться к портфолио</Button>
			</div>
		</div>
	);
}