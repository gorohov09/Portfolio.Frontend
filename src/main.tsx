import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { MainLayout } from './layouts/Main/MainLayout';
import { Portfolio } from './pages/Portfolio/Portfolio';
import { ParticipationActivities } from './pages/ParticipationActivity/ParticipationActivities/ParticipationActivities';
import './index.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				path: '/',
				element: <Portfolio />
			},
			{
				path: '/participationActivities',
				element: <ParticipationActivities />
			}
		]
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);