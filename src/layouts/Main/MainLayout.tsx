import { Outlet } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import styles from './MainLayout.module.css';

export function MainLayout() {
    
	return (
		<div className='main'>
			<Navbar />
			<div className={styles['wrapper-main']}>
				<div className={styles['wrapper-sidebar']}>
					<Sidebar />
				</div>
				<div className={styles['main-content']}>
					<Outlet />
				</div>
			</div>
		</div>
	);
}