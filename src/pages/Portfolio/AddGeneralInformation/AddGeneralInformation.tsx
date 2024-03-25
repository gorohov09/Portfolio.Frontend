import { useNavigate } from 'react-router-dom';
import styles from './AddGeneralInformation.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { useEffect, useState } from 'react';
import Headling from '../../../components/Headling/Headling';
import { Button, Input } from 'antd';
import axios, { AxiosError } from 'axios';
import { Portfolio } from '../../../core/interfaces/portfolio/portfolio.interface';
import { PREFIX } from '../../../helpers/API';
import { userActions } from '../../../store/slices/user.slice';

type GeneralInformation = {
    lastName: string;
    firstName: string;
    surname: string | null;
    birthday: string | null;
}

export function AddGeneralInformation() {
	const navigate = useNavigate();
	const { jwt } = useSelector((s: RootState) => s.user);
	const [generalInformation, setGeneralInformation] = useState<GeneralInformation>();
	const dispatch = useDispatch<AppDispatch>();

	const getPortfolio = async () => {
		try {
			const {data} = await axios.get<Portfolio>(`${PREFIX}/Portfolio/MyPortfolio`, {
				headers: {
					'Authorization': `Bearer ${jwt}`
				}
			});
			setGeneralInformation({
				lastName: data.lastName,
				firstName: data.firstName,
				surname: data.surname,
				birthday: data.birthday
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

	const onChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (generalInformation === undefined) {
			return;
		}

		setGeneralInformation({
			...generalInformation,
			lastName: e.target.value
		});
	};

	const onChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (generalInformation === undefined) {
			return;
		}

		setGeneralInformation({
			...generalInformation,
			firstName: e.target.value
		});
	};

	const onChangeSurname = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (generalInformation === undefined) {
			return;
		}

		setGeneralInformation({
			...generalInformation,
			surname: e.target.value
		});
	};

	const onChangeBirthday = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (generalInformation === undefined) {
			return;
		}

		setGeneralInformation({
			...generalInformation,
			birthday: e.target.value
		});
	};

	const onSave = async () => {
		try {
			const result = await axios.put(`${PREFIX}/Portfolio/Add/General`, {
				lastName: generalInformation?.lastName,
				firstName: generalInformation?.firstName,
				surname: generalInformation?.surname,
				birthday: generalInformation?.birthday ? new Date(generalInformation?.birthday) : null
			}, {
				headers: {
					'Authorization': `Bearer ${jwt}`
				}
			});

			console.log(result);

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
					<label>Фамилия</label>
					<Input onChange={onChangeLastName} className={styles['input']} placeholder='Фамилия' value={generalInformation?.lastName}/>
				</div>
				<div className={styles['field']}>
					<label>Имя</label>
					<Input onChange={onChangeFirstName} className={styles['input']} placeholder='Имя' value={generalInformation?.firstName}/>
				</div>
				<div className={styles['field']}>
					<label>Отчество</label>
					<Input onChange={onChangeSurname} className={styles['input']} placeholder='Отчество' value={generalInformation?.surname ? generalInformation?.surname : ''}/>
				</div>
				<div className={styles['field']}>
					<label>Дата рождения</label>
					<Input onChange={onChangeBirthday} className={styles['input']} placeholder='Дата рождения' value={generalInformation?.birthday ? generalInformation?.birthday.split('T')[0] : ''}/>
				</div>
			</div>
			
			<div className={styles['links']}>
				<Button className={styles['button']} onClick={onSave}>Сохранить</Button>
				<Button className={styles['button']} onClick={() => navigate('/portfolio')}>Вернуться к портфолио</Button>
			</div>
		</div>
	);
}