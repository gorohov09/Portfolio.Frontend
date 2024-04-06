import { Notification } from './notification.interface';

export interface NotificationBaseResponse {
    entities: Notification[];
    totalCount: number;
}