import { FileUploaderProps } from './FileUploader.props';
import styles from './FileUploader.module.css';
import axios from 'axios';
import { File } from '../../core/interfaces/file.interface';
import { PREFIX } from '../../helpers/API';
import { FileViewer } from '../FileViewer/FileViewer';

export function FileUploader({file, setFile, bucket, isDisabled}: FileUploaderProps) {

	const onChangeFile = async (e: React.FormEvent<HTMLInputElement>) => {
		if (!(e.currentTarget.files && e.currentTarget.files[0]))
			return;

		const formData = new FormData();
		formData.append('File', e.currentTarget.files[0], e.currentTarget.files[0].name);

		const {data} = await axios.post<File>(`${PREFIX}/File/${bucket}`, formData, {
			headers: {
				'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2MjJkYzhiZS03MTBjLTM3NjktZTk5ZC02ZmZkY2I5N2Y2YTUiLCJMb2dpbiI6Imdvcm9ob3YiLCJyb2xlIjoiU3R1ZGVudCIsIm5iZiI6MTcxMTA0NzU5MCwiZXhwIjoxNzExMDQ3ODkwLCJpYXQiOjE3MTEwNDc1OTAsImlzcyI6IklzcyIsImF1ZCI6ImF1ZGllbmNlX0F1dGgifQ.YzehkLCsvMhZehitVbxYcL7oIy2SsNbKTVIkwSSS1eTeeIvx3vJ4xwYRUUWl54MDj1tqFgyraN7mi7auxc7YGw'
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