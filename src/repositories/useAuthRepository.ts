import { PREFIX } from '../helpers/API';
import { useBaseRepository } from './useBaseRepository';

export interface RegisterModel {
    firstName: string,
	lastName: string,
	email: string,
	cardNumber: string,
    login: string
    password: string
}

export const useAuthRepository = () => {

	const [authorizedRequest] = useBaseRepository();

	const registerStudent = async (registerModel: RegisterModel): Promise<boolean> => {
		const {success} = await authorizedRequest<void>(`${PREFIX}/Authentication/Register/Student`, {
			method: 'POST',
			data: {
				firstName: registerModel.firstName,
				lastName: registerModel.lastName,
				email: registerModel.email,
				cardNumber: registerModel.cardNumber,
				login: registerModel.login,
				password: registerModel.password
			}
		});

		return success;
	};

	return {
		registerStudent
	};
};