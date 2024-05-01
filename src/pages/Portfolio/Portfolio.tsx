import { Button } from 'antd';
import styles from './Portfolio.module.css';
import { useEffect, useState } from 'react';
import { PortfolioInterface } from '../../core/interfaces/portfolio/portfolio.interface';
import axios, { AxiosError } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { PREFIX } from '../../helpers/API';
import { getEducationLevelToString } from '../../core/enums/portfolio/educationLevel.enum';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../../store/slices/user.slice';
import { ParticipationActivityCard } from '../../components/ParticipationActivityCard/ParticipationActivityCard';
import { ActivitySection } from '../../core/enums/activity/activitySection.enum';

export function Portfolio() {
	const [portfolio, setPortfolio] = useState<PortfolioInterface>();
	const jwt = useSelector((s: RootState) => s.user.jwt);
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const getPortfolio = async () => {
		try {
			const {data} = await axios.get<PortfolioInterface>(`${PREFIX}/Portfolio/MyPortfolio`, {
				headers: {
					'Authorization': `Bearer ${jwt}`
				}
			});
			console.log(data);
			setPortfolio(data);
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

	const getParticipationActivities = (section: ActivitySection) => {
		const block = portfolio?.blocks.find(x => x.section === section);
		if (block === null) {
			return [];
		}

		const participationActivities = block?.participationActivities.map(el => (
			<ParticipationActivityCard 
				title={el.activity.name} 
				date={el.date}
				type={el.activity.type}
				level={el.activity.level}
				fileId={el.document.fileId}/>
		));

		return participationActivities;
	};

	const sienceParticipationActivity = getParticipationActivities(ActivitySection.ScientificAndEducational);

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

			<div className={styles['information-block']}>
				<div className={styles['header']}>
					<h3>Подтвержденные участия в мероприятиях</h3>
				</div>

				<div className={styles['blocks']}>
					<div className={styles['block']}>
						<h4>Научная и учебная деятельность</h4>
						<div className={styles['activities']}>
							{sienceParticipationActivity}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}