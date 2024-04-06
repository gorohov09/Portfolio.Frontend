import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { userActions } from '../../store/slices/user.slice';
import { Bell } from '../Bell/Bell';
import { Role } from '../../core/enums/role.enum';

export function Navbar() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { role } = useSelector((s: RootState) => s.user);

	const logout = () => {
		dispatch(userActions.logout());
		navigate('/auth/login');
	};

	const navigateUrl = role === Role.Manager ? 'notifications' : 'notifications';
    
	return (
		<div className={styles['navbar']}>
			<div className={styles['top']}>
				<Link className={styles['link']} to="/">
					<div className={styles['header']}>
						<img className={styles['icon']} src='/starship.svg' alt='Иконка'/>
						<h1 className={styles['h1']}>Цифровое портфолио</h1>
					</div>
				</Link>
			</div>
			<div className={styles['items']}>
				<div className={styles['item']} onClick={() => navigate(navigateUrl)}>
					<Bell/>
				</div>
				<div className={styles['item']} onClick={logout}>
					<img className={styles['item-icon-logout']} src='/logout.svg' alt='Иконка'/>
				</div>
			</div>
		</div>
	);
}