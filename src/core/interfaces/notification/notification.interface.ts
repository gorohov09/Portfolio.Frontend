import { Guid } from 'guid-typescript';

export interface Notification {
    id: Guid | null;
    title: string;
    description: string;
    isRead: boolean;
    creationDate: string;
}