import { PortfolioCardProps } from './PortfolioCard.props';
import styles from './PortfolioCard.module.css';
import { NavLink } from 'react-router-dom';

export function PortfolioCard({portfolio}: PortfolioCardProps) {
	return (
		<div className={styles['portfolio-card']}>
			<div className={styles['header']}>
				<NavLink to={`/admin/portfolio/${portfolio.id}`}>
					<p>{portfolio.fullName}</p>
				</NavLink>
			</div>
			<div className={styles['body']}>
				<div className={styles['left']}>
					<p>{portfolio.instituteName}</p>
					<p>{portfolio.facultyName}</p>
				</div>
				<div className={styles['right']}>
					<p>{portfolio.specialityName}</p>
					<p>{portfolio.groupNumber}</p>
				</div>
			</div>
		</div>
	);
}