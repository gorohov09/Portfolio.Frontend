import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { MainLayout } from './layouts/Main/MainLayout';
import { Portfolio } from './pages/Portfolio/Portfolio';
import { ParticipationActivities } from './pages/ParticipationActivity/ParticipationActivities/ParticipationActivities';
import './index.css';
import { ParticipationActivitySingle } from './pages/ParticipationActivity/ParticipationActivitySingle/ParticipationActivitySingle';
import { AuthLayout } from './layouts/Auth/AuthLayout';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { RequireAuth } from './helpers/RequireAuth';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Role } from './core/enums/role.enum';
import { AdminLayout } from './layouts/Admin/AdminLayout';
import { Main } from './pages/Main/Main';
import { AddGeneralInformation } from './pages/Portfolio/AddGeneralInformation/AddGeneralInformation';
import { AddEducationInformation } from './pages/Portfolio/AddEducationInformation/AddEducationInformation';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RequireAuth userRole={Role.Student}><MainLayout /></RequireAuth>,
		children: [
			{
				path: '/',
				element: <Main />
			},
			{
				path: '/portfolio',
				element: <Portfolio />
			},
			{
				path: '/addGeneralInformation',
				element: <AddGeneralInformation />
			},
			{
				path: '/addEducationInformation',
				element: <AddEducationInformation />
			},
			{
				path: '/participationActivities',
				element: <ParticipationActivities />,
				children: [
					{
						path: ':id',
						element: <ParticipationActivitySingle />
					}
				]
			}
		]
	},
	{
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{
				path: 'login',
				element: <Login />
			},
			{
				path: 'register',
				element: <Register />
			}
		]
	},
	{
		path: '/admin',
		element: <RequireAuth userRole={Role.Manager}><AdminLayout /></RequireAuth> ,
		children: [
		]
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);