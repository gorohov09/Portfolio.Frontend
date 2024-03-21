import { File } from '../../core/interfaces/file.interface';

export interface FileViewerProps {
    file: File | undefined;
    isDisabled: boolean;
}