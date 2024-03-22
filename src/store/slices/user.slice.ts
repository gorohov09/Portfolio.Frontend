import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadState } from '../storage';
import axios from 'axios';
import { LoginResponse } from '../../core/interfaces/auth/auth.interface';
import { PREFIX } from '../../helpers/API';

export const JWT_PERSISTENT_STATE = 'userData';

export interface UserPersistentState {
    jwt: string | null;
	role: string | null;
	fullName: string | null;
}

export interface UserState {
    jwt: string | null;
	role: string | null;
    loginErrorMessage?: string;
	fullName: string | null;
}

const initialState: UserState = {
	jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
	role: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.role ?? null,
	loginErrorMessage: undefined,
	fullName: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.fullName ?? null
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
			state.fullName = action.payload.fullName;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.loginErrorMessage = action.error.message;
		});    
	}
});

export default userSlice.reducer;
export const userActions = userSlice.actions;