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

const router = createBrowserRouter([
	{
		path: '/',
		element: <RequireAuth><MainLayout /></RequireAuth>,
		children: [
			{
				path: '/',
				element: <Portfolio />
			},
			{
				path: '/participationActivities',
				element: <ParticipationActivities />
			},
			{
				path: '/participationActivities/:id',
				element: <ParticipationActivitySingle />
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
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);