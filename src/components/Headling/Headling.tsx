import styles from './Headling.module.css';
import cn from 'classnames';
import { HeadlingProps } from './Headling.props';

function Headling({ children, className, ...props }: HeadlingProps) {
	return (
		<h2 className={cn(className, styles['h1'])} {...props}>{children}</h2>
	);
}

export default Headling;