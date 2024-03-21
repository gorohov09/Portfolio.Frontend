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
					'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2MjJkYzhiZS03MTBjLTM3NjktZTk5ZC02ZmZkY2I5N2Y2YTUiLCJMb2dpbiI6Imdvcm9ob3YiLCJyb2xlIjoiU3R1ZGVudCIsIm5iZiI6MTcxMTA2MTM5MCwiZXhwIjoxNzExNjYxMzkwLCJpYXQiOjE3MTEwNjEzOTAsImlzcyI6IklzcyIsImF1ZCI6ImF1ZGllbmNlX0F1dGgifQ.ufZo1nNBC-ec8hlxOBei0oTXxevfm7jdDXrgJZeZc8wKFKS37CglammFN5GxVoKM3g22hTfbaP82rXaRqDIV8g'
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