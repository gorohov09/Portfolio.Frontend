import { Outlet } from 'react-router-dom';

export function MainLayout() {
    
	return (
		<div>
			<div>
                Что-то
			</div>
			<div>
				<Outlet />
			</div>
		</div>
	);
}