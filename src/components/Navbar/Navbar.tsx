import { Link, useNavigate } from 'react-router-dom';
import {
	BellTwoTone
} from '@ant-design/icons';
import styles from './Navbar.module.css';

export function Navbar() {
	const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem('jwt');
		navigate('/auth/login');
	};
    
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
				<div className={styles['item']}>
					<BellTwoTone className={styles['item-icon']}/>
				</div>
				<div className={styles['item']} onClick={logout}>
					<img className={styles['item-icon-logout']} src='/logout.svg' alt='Иконка'/>
				</div>
			</div>
		</div>
	);
}