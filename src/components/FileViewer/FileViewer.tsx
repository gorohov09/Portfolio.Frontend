import styles from './FileViewer.module.css';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import { FileViewerProps } from './FileViewer.props';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export function FileViewer({file, isDisabled}: FileViewerProps) {
	const jwt = useSelector((s: RootState) => s.user.jwt);

	const downloadFile = async () => {
		if (isDisabled) {
			return;
		}
        
		try {
			const response = await axios.get(`${PREFIX}/File/${file?.id}/Download`, {
				responseType: 'blob',
				headers: {
					'Authorization': `Bearer ${jwt}`
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