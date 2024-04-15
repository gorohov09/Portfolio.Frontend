import { Input, Modal } from 'antd';
import { ModalInputProps } from './ModalInput.props';
import styles from './ModalInput.module.css';

function ModalInput({ setIsModalOpen, isModalOpen, setComment, comment, sendOnRevision }: ModalInputProps) {

	const handleOk = () => {
		setIsModalOpen(false);
		sendOnRevision();
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const onChangComment = (e: React.ChangeEvent<HTMLInputElement>) => {
		setComment(e.target.value);
	};

	return (
		<Modal title="Напишите причину отклонения заявки" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
			<Input onChange={onChangComment} 
				className={styles['input']} 
				placeholder='Название' 
				value={comment ? comment : ''}/>
		</Modal>
	);
}

export default ModalInput;