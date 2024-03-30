export enum ActivityLevel {

	University = 1,

	Municipal = 2,

	Regional = 3,
    
    Country = 4,

	International = 5,
}

export function getActivityLevelToString(result: ActivityLevel){
	switch(result) { 
	case ActivityLevel.University: { 
		return 'Университетское';
	} 
	case ActivityLevel.Municipal: { 
		return 'Городское';
	} 
	case ActivityLevel.Regional: { 
		return 'Региональное';
	}
	case ActivityLevel.Country: { 
		return 'Всероссийское';
	}
	case ActivityLevel.International: { 
		return 'Международное';
	}
	default: { 
		return '';
	} 
	} 
}