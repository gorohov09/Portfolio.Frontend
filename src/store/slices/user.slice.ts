import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadState } from '../storage';
import axios from 'axios';
import { LoginResponse } from '../../core/interfaces/auth/auth.interface';
import { PREFIX } from '../../helpers/API';
import { User } from '../../core/interfaces/user/user.interface';

export const JWT_PERSISTENT_STATE = 'userData';

export interface UserPersistentState {
    jwt: string | null;
	role: string | null;
}

export interface UserState {
    jwt: string | null;
	role: string | null;
    loginErrorMessage?: string;
	fullName: string | null;
	notificationCount: number
}

const initialState: UserState = {
	jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
	role: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.role ?? null,
	loginErrorMessage: undefined,
	fullName: null,
	notificationCount: 0
};

export const login = createAsyncThunk('user/login',
	async (params: {login: string, password: string}) => {
		const { data } = await axios.post<LoginResponse>(`${PREFIX}/Authentication/Login`, {
			login: params.login,
			password: params.password
		});
		return data;
	}
);

export const userInfo = createAsyncThunk('user/info',
	async (params: {jwt: string | null}) => {
		const { data } = await axios.get<User>(`${PREFIX}/User/MyUserInfo`, {
			headers: {
				'Authorization': `Bearer ${params.jwt}`
			}
		});
		return data;
	}
);

export const addUserCountNotification = createAsyncThunk('user/addUserCountNotification',
	async (params: {count: number}) => {
		return params.count;
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: (state) => {
			state.jwt = null;
			state.role = null;
			state.fullName = null;
		},
		clearLoginError: (state) => {
			state.loginErrorMessage = undefined;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
			state.jwt = action.payload.token;
			state.role = action.payload.role;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.loginErrorMessage = action.error.message;
		});
		builder.addCase(userInfo.fulfilled, (state, action: PayloadAction<User>) => {
			state.fullName = action.payload.fullName ?? null;
			state.notificationCount = action.payload.notificationCount;
		});
		builder.addCase(addUserCountNotification.fulfilled, (state, action: PayloadAction<number>) => {
			state.notificationCount = action.payload;
		});
	}
});

export default userSlice.reducer;
export const userActions = userSlice.actions;