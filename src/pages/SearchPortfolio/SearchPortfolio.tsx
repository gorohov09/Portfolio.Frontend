import { Button, Input, Select } from 'antd';
import styles from './SearchPortfolio.module.css';
import { useState } from 'react';
import { PREFIX } from '../../helpers/API';
import axios, { AxiosError } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../../store/slices/user.slice';
import { PortfolioList, PortfolioListItem } from '../../core/interfaces/portfolio/portfolio.interface';
import { PortfolioCard } from '../../components/PortfolioCard/PortfolioCard';

const institutesOptions = [
	{
		label: 'ИКТЗИ',
		value: 'ИКТЗИ'
	},
	{
		label: 'ФМФ',
		value: 'ФМФ'
	}
];

const facultyOptions = [
	{
		label: 'Кафедра прикладной математики и информатики',
		value: 'ПМИ',
		institute: 'ИКТЗИ'
	},
	{
		label: 'Кафедра систем инфромационной безопасности',
		value: 'СИБ',
		institute: 'ИКТЗИ'
	},
	{
		label: 'Кафедра лазерных технологий',
		value: 'КЛТ',
		institute: 'ФМФ'
	}
];

export function SearchPortfolio() {

	const {jwt} = useSelector((s: RootState) => s.user);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const [institute, setInstitute] = useState<string>();
	const [faculty, setFaculty] = useState<string>();
	const [lastName, setLastName] = useState<string>();
	const [portfolios, setPortfolios] = useState<PortfolioListItem[]>();

	const getPortfolios = async () => {
		try {
			const {data} = await axios.post<PortfolioList>(`${PREFIX}/Portfolio/list`,  {
				pageNumber: 0,
				pageSize: 10,
				lastName: lastName,
				firstName: null,
				surname: null,
				institute: institute,
				faculty: faculty
			},
			{
				headers: {
					'Authorization': `Bearer ${jwt}`
				}
			});
			setPortfolios(data.entities);
		} catch (e) {
			if (e instanceof AxiosError) {
				if (e.response?.status == 401) {
					dispatch(userActions.logout());
					navigate('/auth/login');
				}
			}
		}
	};
    
	const onChangeInstitutes = (value: string) => {
		setInstitute(value);
		setFaculty(undefined);
	};

	const onChangeFaculty = (value: string) => {
		setFaculty(value);
	};

	const onChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLastName(e.target.value);
	};

	const facultyOptionsFilter = institute != undefined ? facultyOptions.filter(x => x.institute === institute) : facultyOptions;

	return (
		<div className={styles['main-search']}>
			<div className={styles['search']}>
				<div className={styles['filters']}>
					<div className={styles['field']}>
						<label>Выберите институт</label>
						<Select
							value={institute}
							style={{
								width: 300
							}}
							onChange={onChangeInstitutes}
							options={institutesOptions}
						/>
					</div>

					<div className={styles['field']}>
						<label>Выберите каферду</label>
						<Select
							value={faculty}
							style={{
								width: 300
							}}
							onChange={onChangeFaculty}
							options={facultyOptionsFilter}
						/>
					</div>

					<div className={styles['field']}>
						<label>Введите фамилию</label>
						<Input value={lastName} 
							placeholder="Фамилия" 
							onChange={onChangeLastName}/>
					</div>
				</div>
				<div className={styles['button']}>
					<Button onClick={() => getPortfolios()}>Поиск</Button>
				</div>
			</div>

			<div className={styles['portfolios']}>
				{
					portfolios != undefined && portfolios?.length > 0 
						?
						portfolios?.map(el => (
							<PortfolioCard portfolio={el} />
						))
						:
						<p>Ничего не найдено</p>
				}
			</div>

		</div>
	);
}