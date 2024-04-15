export enum ParticipationActivityStatus {
    Draft = 1,
    Submitted = 2,
    SentRevision = 3,
    Approved = 4,
}

export function getParticipationActivityStatusToString(status: ParticipationActivityStatus | undefined){
	if (status == undefined) {
		return '';
	}

	switch(status) { 
	case ParticipationActivityStatus.Draft: { 
		return 'Черновик';
	} 
	case ParticipationActivityStatus.Submitted: { 
		return 'Подано';
	} 
	case ParticipationActivityStatus.SentRevision: { 
		return 'На доработке';
	}
	case ParticipationActivityStatus.Approved: { 
		return 'Одобрено';
	}
	default: { 
		return '';
	} 
	} 
}

export function getColorStatus(status: string) {

	switch (status) {
	case 'Черновик':
		return '#D3D3D3';
	case 'Одобрено':
		return '#87d068';
	case 'Подано': {
		return '#ffd700';
	}
	}
}