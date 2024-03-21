import { useState, useEffect } from 'react';
import { ParticipationActivityTable } from '../../../core/interfaces/participationActivity/participationActivityTable.interface';
import axios from 'axios';
import { PREFIX } from '../../../helpers/API';
import { ParticipationActivitiesTable } from '../../../components/ParticipationActivitiesTable/ParticipationActivitiesTable';
import { ParticipationActivityBaseResponse } from '../../../core/interfaces/participationActivity/participationActivityBaseResponse.interface';

export function ParticipationActivities() {
	const [participationActivities, setParticipationActivities] = useState<ParticipationActivityTable[]>([]);

	const getParticipationActivities = async () => {
		try {
			const {data} = await axios.get<ParticipationActivityBaseResponse>(`${PREFIX}/ParticipationActivity/list`, {
				headers: {
					'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2MjJkYzhiZS03MTBjLTM3NjktZTk5ZC02ZmZkY2I5N2Y2YTUiLCJMb2dpbiI6Imdvcm9ob3YiLCJyb2xlIjoiU3R1ZGVudCIsIm5iZiI6MTcxMTA1NTM2NiwiZXhwIjoxNzExMDU1NjY2LCJpYXQiOjE3MTEwNTUzNjYsImlzcyI6IklzcyIsImF1ZCI6ImF1ZGllbmNlX0F1dGgifQ.PIITQfHuJ2wJhZf18MRTcMuP_FpYUwN-OPBN0evh6HAeVkyTAFTpGjTFxY3PnoaVCidOIFOCBe5sM5iLj0ccYw'
				}
			});
			setParticipationActivities(data.entities);
		} catch (e) {
			console.error(e);
			return;
		}
	};

	useEffect(() => {
		getParticipationActivities();
	}, []);

	return (
		<div>
			<ParticipationActivitiesTable participationActivities={participationActivities} />
		</div>
	);
}