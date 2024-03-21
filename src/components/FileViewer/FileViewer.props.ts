import { File } from '../../interfaces/file.interface';

export interface FileViewerProps {
    file: File | undefined;
    isDisabled: boolean;
}