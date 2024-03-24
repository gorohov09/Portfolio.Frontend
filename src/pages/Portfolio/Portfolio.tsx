import { Button } from 'antd';
import styles from './Portfolio.module.css';
import { useEffect, useState } from 'react';
import { Portfolio } from '../../core/interfaces/portfolio/portfolio.interface';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { PREFIX } from '../../helpers/API';
import { getEducationLevelToString } from '../../core/enums/portfolio/educationLevel.enum';
import { useNavigate } from 'react-router-dom';

export function Portfolio() {
	const [portfolio, setPortfolio] = useState<Portfolio>();
	const jwt = useSelector((s: RootState) => s.user.jwt);
	const navigate = useNavigate();

	const getPortfolio = async () => {
		try {
			const {data} = await axios.get<Portfolio>(`${PREFIX}/Portfolio/MyPortfolio`, {
				headers: {
					'Authorization': `Bearer ${jwt}`
				}
			});
			console.log(data);
			setPortfolio(data);
		} catch (e) {
			console.error(e);
			return;
		}
	};

	useEffect(() => {
		getPortfolio();
	}, []);

	return (
		<div className={styles['portfolio']}>
			<div className={styles['information-block']}>
				<div className={styles['header']}>
					<h3>Основная информация</h3>
					<Button onClick={() => navigate('/addGeneralInformation')}>Изменить</Button>
				</div>
				<div className={styles['fio']}>
					<div className={styles['lastname_firstname']}>
						<p><b>Фамилия:</b> {portfolio?.lastName}</p>
						<p><b>Имя:</b> {portfolio?.firstName}</p>
					</div>
					<div className={styles['surname']}>
						<p><b>Отчество:</b> {portfolio?.surname ? portfolio?.surname : 'Не заполнено'}</p>
					</div>
				</div>
				<div className={styles['birthday']}>
					<p><b>Дата рождения:</b> {portfolio?.birthday ? portfolio?.birthday.split('T')[0] : 'Не заполнено'}</p>
				</div>
			</div>

			<div className={styles['information-block']}>
				<div className={styles['header']}>
					<h3>Информация о получаемом образовании в КНИТУ-КАИ</h3>
					<Button onClick={() => navigate('/addEducationInformation')}>Изменить</Button>
				</div>
				<div className={styles['institute']}>
					<p><b>Полное название инстиутута:</b> {portfolio?.institute ? portfolio?.institute?.fullName : 'Не заполнено'}</p>
					<p><b>Сокращенное название инстиутута:</b> {portfolio?.institute ? portfolio?.institute?.shortName : 'Не  заполнено'}</p>
				</div>
				<div className={styles['faculty']}>
					<p><b>Полное название кафедры:</b> {portfolio?.faculty ? portfolio?.faculty?.fullName : 'Не заполнено'}</p>
					<p><b>Сокращенное название кафедры:</b> {portfolio?.faculty ? portfolio?.faculty?.shortName : 'Не заполнено'}</p>
				</div>
				<div className={styles['speciality']}>
					<p><b>Специальность:</b> {portfolio?.speciality ? `${portfolio?.speciality.name} (${portfolio?.speciality?.number})` : 'Не заполнено'}</p>
				</div>
				<div className={styles['info']}>
					<p><b>Уровень образования:</b> {portfolio?.educationLevel ? getEducationLevelToString(portfolio?.educationLevel) : 'Не заполнено'}</p>
					<p><b>Номер группы:</b> {portfolio?.groupNumber ? portfolio?.groupNumber : 'Не заполнено'}</p>
				</div>
			</div>
		</div>
	);
}