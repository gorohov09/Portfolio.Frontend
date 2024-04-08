import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/store';
import { userActions } from '../store/slices/user.slice';

export const useBaseRepository = () => {

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { jwt } = useSelector((s: RootState) => s.user);

	const authorizedRequest = async <T>(url: string, config?: AxiosRequestConfig): Promise<T | undefined> => {
		try {
			const response = await axios.request<T>({
				url,
				...config,
				headers: {
					'Authorization': `Bearer ${jwt}`,
					...(config?.headers || {})
				}
			});
			return response.data;
		} catch (e) {
			if (e instanceof AxiosError) {
				handleRequestError(e);
			}
		}
	};

	const handleRequestError = (error: AxiosError) => {
		if (error.response?.status === 401) {
			dispatch(userActions.logout());
			navigate('/auth/login');
		}
	};

	return [authorizedRequest];
};