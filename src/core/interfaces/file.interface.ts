import { Guid } from 'guid-typescript';

export interface File {
    id: Guid | undefined;
    name: string | undefined;
    address: string | undefined;
}