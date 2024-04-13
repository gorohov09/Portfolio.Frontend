import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/store';
import { userActions } from '../store/slices/user.slice';
import { Modal } from 'antd';

interface CustomError {
	title: string;
}

export interface BaseResult<T> {
	data: T | undefined;
	success: boolean;
}

export const useBaseRepository = () => {

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { jwt } = useSelector((s: RootState) => s.user);

	const authorizedRequest = async <T>(url: string, config?: AxiosRequestConfig): Promise<BaseResult<T>> => {
		try {
			const response = await axios.request<T>({
				url,
				...config,
				headers: {
					'Authorization': `Bearer ${jwt}`,
					...(config?.headers || {})
				}
			});
			return {
				data: response.data,
				success: true
			};
		} catch (e) {
			if (e instanceof AxiosError) {
				handleRequestError(e);
			}

			return {
				data: undefined,
				success: false
			};
		}
	};

	const handleRequestError = (error: AxiosError<CustomError>) => {
		if (error.response?.status === 401) {
			dispatch(userActions.logout());
			navigate('/auth/login');
			Modal.error({
				title: 'Ошибка',
				content: 'По истечению времени вы разлогинились! Пожалуйста авторизуйтесь повторно'
			});

			return;
		}

		Modal.error({
			title: 'Ошибка',
			content: error.response?.data.title
		});
	};

	return [authorizedRequest];
};