import { File } from '../../core/interfaces/file.interface';

export interface FileUploaderProps {
    file: File | undefined;
    setFile: (file: File) => void;
    bucket: number | undefined;
    isDisabled: boolean;
}