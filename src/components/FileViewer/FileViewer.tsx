import styles from './FileViewer.module.css';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import { FileViewerProps } from './FileViewer.props';

export function FileViewer({file, isDisabled}: FileViewerProps) {

	const downloadFile = async () => {
		if (isDisabled) {
			return;
		}
        
		try {
			const response = await axios.get(`${PREFIX}/File/${file?.id}/Download`, {
				responseType: 'blob',
				headers: {
					'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2MjJkYzhiZS03MTBjLTM3NjktZTk5ZC02ZmZkY2I5N2Y2YTUiLCJMb2dpbiI6Imdvcm9ob3YiLCJyb2xlIjoiU3R1ZGVudCIsIm5iZiI6MTcxMTA0NzU5MCwiZXhwIjoxNzExMDQ3ODkwLCJpYXQiOjE3MTEwNDc1OTAsImlzcyI6IklzcyIsImF1ZCI6ImF1ZGllbmNlX0F1dGgifQ.YzehkLCsvMhZehitVbxYcL7oIy2SsNbKTVIkwSSS1eTeeIvx3vJ4xwYRUUWl54MDj1tqFgyraN7mi7auxc7YGw'
				}
			});

			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', file?.name ?? 'file.pdf');
			document.body.appendChild(link);
			link.click();
		} catch (error) {
			console.error('Ошибка при загрузке файла:', error);
		}
	};

	return (
		<div className={styles[ isDisabled ? 'file-viewer-disable' : 'file-viewer']} onClick={downloadFile}>
			<span>{file?.name}</span>
		</div>
	);
}