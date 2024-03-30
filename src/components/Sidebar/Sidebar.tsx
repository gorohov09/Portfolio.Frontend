import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';
import cn from 'classnames';
import {
	BookTwoTone,
	CarryOutTwoTone
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Role } from '../../core/enums/role.enum';

export function Sidebar() {

	const { fullName, role } = useSelector((s: RootState) => s.user);
    
	return (
		<div className={styles['sidebar']}>
			<div className={styles['user']}>
				<img src="/avatar.png" alt="Аватар пользователя" />
				<div className={styles['name']}>{ fullName }</div>
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
									<span className={styles['menu-item-text']}>Мое портфолио</span>
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
							<NavLink to='/activities' className={({ isActive }) => cn(styles['link'], {
								[styles.active]: isActive
							})}>
								<div className={styles['menu-item']}>
									<BookTwoTone className={styles['menu-item-icon']}/>
									<span className={styles['menu-item-text']}>Мероприятия</span>
								</div>    
							</NavLink>

							<NavLink to='/participationActivities' className={({ isActive }) => cn(styles['link'], {
								[styles.active]: isActive
							})}>
								<div className={styles['menu-item']}>
									<CarryOutTwoTone className={styles['menu-item-icon']}/>
									<span className={styles['menu-item-text']}>Проверки</span>
								</div>    
							</NavLink>
						</>
				}
			</div>
		</div>
	);
}