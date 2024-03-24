export enum EducationLevel {
    Bachelor = 1,
    Magistracy = 2,
    Specialty = 3,
    Postgraduate = 4,
}

export function getEducationLevelToString(level: EducationLevel | null | undefined){
	if (level == undefined) {
		return '';
	}

	switch(level) { 
	case EducationLevel.Bachelor: { 
		return 'Бакалавриат';
	} 
	case EducationLevel.Magistracy: { 
		return 'Магистратура';
	} 
	case EducationLevel.Specialty: { 
		return 'Специалитет';
	}
	case EducationLevel.Postgraduate: { 
		return 'Аспирантура';
	}
	default: { 
		return '';
	} 
	} 
}