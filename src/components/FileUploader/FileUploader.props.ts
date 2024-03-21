import { Dispatch, SetStateAction } from 'react';
import { File } from '../../core/interfaces/file.interface';

export interface FileUploaderProps {
    file: File | undefined;
    setFile: Dispatch<SetStateAction<File | undefined>>;
    bucket: number | undefined;
    isDisabled: boolean;
}