export enum ActivitySection {
    ScientificAndEducational = 1
}

export function getActivitySectionToString(result: ActivitySection){
	switch(result) { 
	case ActivitySection.ScientificAndEducational: { 
		return 'Научная и учебная деятельность';
	} 
	default: { 
		return '';
	} 
	} 
}