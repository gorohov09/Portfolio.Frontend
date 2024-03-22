import { Link, useNavigate } from 'react-router-dom';
import Headling from '../../components/Headling/Headling';
import styles from './Login.module.css';
import { Button, Input } from 'antd';
import { FormEvent, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../helpers/API';
import { LoginResponse } from '../../core/interfaces/auth/auth.interface';

export type LoginForm = {
    login: {
        value: string;
    }
    password: {
        value: string;
    }
}

export function Login() {
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>();

	const submit = (e: FormEvent) => {
		e.preventDefault();
		setError(null);
		const target = e.target as typeof e.target & LoginForm;
		const { login, password } = target;
		sendLogin(login.value, password.value);
	};
    
	const sendLogin = async (login: string, password: string) => {
		try {
			const { data } = await axios.post<LoginResponse>(`${PREFIX}/Authentication/Login`, {
				login,
				password
			});

			localStorage.setItem('jwt', data.token);
			navigate('/');

		} catch (e) {
			if (e instanceof AxiosError) {
				setError(e.message);
			}
		}
	};

	return (
		<div className={styles['login']}>
			<Headling>Вход</Headling>
			{error && <div className={styles['error']}>{error}</div>}
			<form className={styles['form']} onSubmit={submit}>
				<div className={styles['field']}>
					<label htmlFor="login">Ваш логин</label>
					<Input id="login" name='login' placeholder='Логин' />
				</div>
				<div className={styles['field']}>
					<label htmlFor="password">Ваш пароль</label>
					<Input id="password" name='password' type="password" placeholder='Пароль' />
				</div>
				<Button htmlType="submit">Вход</Button>
			</form>
			<div className={styles['links']}>
				<div>Нет акканута?</div>
				<Link to="/auth/register">Зарегистрироваться</Link>
			</div>
		</div>
	);
}