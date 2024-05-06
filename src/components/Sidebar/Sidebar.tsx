import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';
import cn from 'classnames';
import {
	BookTwoTone,
	CarryOutTwoTone
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { Role } from '../../core/enums/role.enum';
import { userInfo } from '../../store/slices/user.slice';
import { useEffect } from 'react';

export function Sidebar() {
	const { fullName, role, jwt } = useSelector((s: RootState) => s.user);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(userInfo({jwt: jwt}));
	}, []);
    
	return (
		<div className={styles['sidebar']}>
			<div className={styles['user']}>
				<div className={styles['name']}>{ role === Role.Student ? fullName : <>Администрация университета</> }</div>
				<div className={styles['role']}>{ role === Role.Student ? <>(Студент)</> : <>(Сотрудник)</> }</div>
			</div>
			<div className={styles['menu']}>
				{
					role == Role.Student
						? 
						<>
							<NavLink to='/portfolio' className={({ isActive }) => cn(styles['link'], {
								[styles.active]: isActive
							})}>
								<div className={styles['menu-item']}>
									<BookTwoTone className={styles['menu-item-icon']}/>
									<span className={styles['menu-item-text']}>Портфолио</span>
								</div>    
							</NavLink>

							<NavLink to='/participationActivities' className={({ isActive }) => cn(styles['link'], {
								[styles.active]: isActive
							})}>
								<div className={styles['menu-item']}>
									<CarryOutTwoTone className={styles['menu-item-icon']}/>
									<span className={styles['menu-item-text']}>Мои участия</span>
								</div>    
							</NavLink>

							<NavLink to='/activities' className={({ isActive }) => cn(styles['link'], {
								[styles.active]: isActive
							})}>
								<div className={styles['menu-item']}>
									<BookTwoTone className={styles['menu-item-icon']}/>
									<span className={styles['menu-item-text']}>Мероприятия</span>
								</div>    
							</NavLink>
						</>
						:
						<>
							<NavLink to='/admin/activities' className={({ isActive }) => cn(styles['link'], {
								[styles.active]: isActive
							})}>
								<div className={styles['menu-item']}>
									<BookTwoTone className={styles['menu-item-icon']}/>
									<span className={styles['menu-item-text']}>Мероприятия</span>
								</div>    
							</NavLink>

							<NavLink to='/admin/participationActivities' className={({ isActive }) => cn(styles['link'], {
								[styles.active]: isActive
							})}>
								<div className={styles['menu-item']}>
									<CarryOutTwoTone className={styles['menu-item-icon']}/>
									<span className={styles['menu-item-text']}>Проверки</span>
								</div>    
							</NavLink>

							<NavLink to='/admin/portfolios' className={({ isActive }) => cn(styles['link'], {
								[styles.active]: isActive
							})}>
								<div className={styles['menu-item']}>
									<CarryOutTwoTone className={styles['menu-item-icon']}/>
									<span className={styles['menu-item-text']}>Портфолио</span>
								</div>    
							</NavLink>
						</>
				}
			</div>
		</div>
	);
}