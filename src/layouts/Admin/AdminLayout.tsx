import { Navbar } from '../../components/Navbar/Navbar';
import styles from './AdminLayout.module.css';

export function AdminLayout() {
    
	return (
		<div className={styles['admin-layout']}>
			<Navbar />
			<div>
                Admin
			</div>
		</div>
	);
}