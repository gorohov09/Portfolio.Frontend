import { FileUploaderProps } from './FileUploader.props';
import styles from './FileUploader.module.css';
import axios from 'axios';
import { File } from '../../core/interfaces/file.interface';
import { PREFIX } from '../../helpers/API';
import { FileViewer } from '../FileViewer/FileViewer';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export function FileUploader({file, setFile, bucket, isDisabled}: FileUploaderProps) {
	const jwt = useSelector((s: RootState) => s.user.jwt);

	const onChangeFile = async (e: React.FormEvent<HTMLInputElement>) => {
		if (!(e.currentTarget.files && e.currentTarget.files[0]))
			return;

		const formData = new FormData();
		formData.append('File', e.currentTarget.files[0], e.currentTarget.files[0].name);

		const {data} = await axios.post<File>(`${PREFIX}/File/${bucket}`, formData, {
			headers: {
				'Authorization': `Bearer ${jwt}`
			}
		});
		setFile(data);
	};

	return (
		<div className={styles['file-uploader']}>
			<div className={styles['file-input']}>
				<input disabled={isDisabled} type="file" className={styles['input']} onChange={onChangeFile}/>
			</div>
			<FileViewer file={file} isDisabled={isDisabled}/>
		</div>
	);
}