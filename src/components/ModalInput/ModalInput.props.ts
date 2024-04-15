import { Dispatch, SetStateAction } from 'react';

export interface ModalInputProps {
    comment: string | undefined;
    isModalOpen: boolean;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    setComment: Dispatch<SetStateAction<string | undefined>>;
    sendOnRevision: () => void;
}