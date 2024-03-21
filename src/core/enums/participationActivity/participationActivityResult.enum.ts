export enum ParticipationActivityResult {
    Participant = 1,
    Laureate = 2,
    Winner = 3,
}

export function getParticipationActivityResultToString(result: ParticipationActivityResult){
	switch(result) { 
	case ParticipationActivityResult.Participant: { 
		return 'Участник';
	} 
	case ParticipationActivityResult.Laureate: { 
		return 'Призер';
	} 
	case ParticipationActivityResult.Winner: { 
		return 'Победитель';
	}
	default: { 
		return '';
	} 
	} 
}