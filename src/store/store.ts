import { configureStore } from '@reduxjs/toolkit';
import userSlice, { JWT_PERSISTENT_STATE } from './slices/user.slice';
import { saveState } from './storage';
import notificationSlice from './slices/notification.slice';

export const store = configureStore({
	reducer: {
		user: userSlice,
		notificationList: notificationSlice
	}
});

store.subscribe(() => {
	saveState({jwt: store.getState().user.jwt, role: store.getState().user.role}, JWT_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;