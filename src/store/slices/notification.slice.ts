import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Notification } from '../../core/interfaces/notification/notification.interface';
import axios from 'axios';
import { NotificationBaseResponse } from '../../core/interfaces/notification/notificationBaseResponse.interface';
import { PREFIX } from '../../helpers/API';
import { Guid } from 'guid-typescript';

export interface NotificationsState {
    notificationList: Notification[];
}

const initialState: NotificationsState = {
	notificationList: []
};

export const addNotification = createAsyncThunk('notifications/addNotification',
	async (params: {notification: {id: Guid, title: string, description: string, creationDate: string}}) => {
		return params.notification as Notification;
	}
);

export const getNotificationList = createAsyncThunk('notifications/list',
	async (params: {jwt: string | null}) => {
		const {data} = await axios.get<NotificationBaseResponse>(`${PREFIX}/Notification/list`, {
			headers: {
				'Authorization': `Bearer ${params.jwt}`
			}
		});
		return data.entities;
	}
);

export const notificationSlice = createSlice({
	name: 'notificationList',
	initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder.addCase(addNotification.fulfilled, (state, action: PayloadAction<Notification>) => {
			state.notificationList.unshift(action.payload);
		});
		builder.addCase(getNotificationList.fulfilled, (state, action: PayloadAction<Notification[]>) => {
			state.notificationList = action.payload;
		});
	}
});

export default notificationSlice.reducer;
export const notificationActions = notificationSlice.actions;