import { configureStore } from '@reduxjs/toolkit';
import userSlice, { JWT_PERSISTENT_STATE } from './slices/user.slice';
import { saveState } from './storage';

export const store = configureStore({
	reducer: {
		user: userSlice
	}
});

store.subscribe(() => {
	saveState({jwt: store.getState().user.jwt, role: store.getState().user.role, fullName: store.getState().user.fullName}, JWT_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;