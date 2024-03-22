
import { RootState } from '../store/store';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Role } from '../core/enums/role.enum';

export const RequireAuth = ({ children, userRole } : {children : ReactNode, userRole: Role}) => {
	const { jwt, role } = useSelector((s: RootState) => s.user);

	if (!jwt) {
		return <Navigate to="/auth/login" replace />;
	}

	if (role != userRole) {
		if (role == Role.Student) {
			return <Navigate to="/" replace />;
		}
		else {
			return <Navigate to="/admin" replace />;
		}
	}

	return children;
};