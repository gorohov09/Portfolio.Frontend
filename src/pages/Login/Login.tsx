import { Link, useNavigate } from 'react-router-dom';
import Headling from '../../components/Headling/Headling';
import styles from './Login.module.css';
import { Button, Input } from 'antd';
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { login, userActions } from '../../store/slices/user.slice';
import { Role } from '../../core/enums/role.enum';

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
	const dispatch = useDispatch<AppDispatch>();
	const { jwt, role, loginErrorMessage } = useSelector((s: RootState) => s.user);

	useEffect(() => {
		if (jwt) {
			if (role === Role.Student)
				navigate('/');
			else
				navigate('/admin');
		}
	}, [jwt, role, navigate]);

	const submit = (e: FormEvent) => {
		e.preventDefault();
		dispatch(userActions.clearLoginError());
		const target = e.target as typeof e.target & LoginForm;
		const { login, password } = target;
		sendLogin(login.value, password.value);
	};
    
	const sendLogin = async (_login: string, password: string) => {
		dispatch(login({login: _login, password}));
	};

	return (
		<div className={styles['login']}>
			<Headling>Вход</Headling>
			{loginErrorMessage && <div className={styles['error']}>{loginErrorMessage}</div>}
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