export enum ActivityType {

	Olympiad = 1,

	Сonference = 2,
}

export function getActivityTypeToString(result: ActivityType | undefined){
	if (result == undefined) {
		return '';
	}

	switch(result) { 
	case ActivityType.Olympiad: { 
		return 'Олимпиада';
	} 
	case ActivityType.Сonference: { 
		return 'Конференция';
	} 
	default: { 
		return '';
	} 
	} 
}