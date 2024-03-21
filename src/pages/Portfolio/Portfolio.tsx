import { useEffect, useState } from 'react';
import { FileUploader } from '../../components/FileUploader/FileUploader';
import { File } from '../../core/interfaces/file.interface';

export function Portfolio() {

	const [file, setFile] = useState<File>();

	useEffect(() => {
		console.log(file);
	}, [file]);
    
	return (
		<FileUploader 
			file={file} 
			setFile={setFile} 
			bucket={2} 
			isDisabled={true}/>
	);
}