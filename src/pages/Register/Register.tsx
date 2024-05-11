import { Link } from 'react-router-dom';
import Headling from '../../components/Headling/Headling';
import styles from './Register.module.css';
import { Button, Input, Modal } from 'antd';
import { FormEvent } from 'react';
import { RegisterModel, useAuthRepository } from '../../repositories/useAuthRepository';

export type RegisterForm = {
	firstName: {
        value: string;
    },
	lastName: {
        value: string;
    },
	email: {
        value: string;
    },
	cardNumber: {
        value: string;
    },
    login: {
        value: string;
    }
    password: {
        value: string;
    }
}

export function Register() {

	const {registerStudent} = useAuthRepository();

	const submit = (e: FormEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & RegisterForm;
		register({
			login: target.login.value,
			password: target.password.value,
			lastName: target.lastName.value,
			firstName: target.firstName.value,
			email: target.email.value,
			cardNumber: target.cardNumber.value
		});
	};

	const register = async (model: RegisterModel) => {

		const success = await registerStudent(model);

		if (success) {
			Modal.success({
				content: 'Вы успешно зарегестрировались!'
			});
		}
	};

	return (
		<div className={styles['login']}>
			<Headling>Регистрация</Headling>
			<form className={styles['form']} onSubmit={submit}>
				<div className={styles['field']}>
					<label htmlFor="login">Ваша фамилия</label>
					<Input id="lastName" name='lastName' placeholder='Фамилия' />
				</div>
				<div className={styles['field']}>
					<label htmlFor="login">Ваше имя</label>
					<Input id="firstName" name='firstName' placeholder='Имя' />
				</div>
				<div className={styles['field']}>
					<label htmlFor="login">Ваш адрес электронной почты</label>
					<Input id="email" name='email' placeholder='E-mail' />
				</div>
				<div className={styles['field']}>
					<label htmlFor="cardNumber">Ваш номер зачетки книжки</label>
					<Input id="cardNumber" name='cardNumber' placeholder='Номер зачетной книжки' />
				</div>
				<div className={styles['field']}>
					<label htmlFor="login">Придумайте логин</label>
					<Input id="login" name='login' placeholder='Логин' />
				</div>
				<div className={styles['field']}>
					<label htmlFor="password">Придумайте пароль</label>
					<Input id="password" name='password' type="password" placeholder='Пароль' />
				</div>
				<Button htmlType="submit">Зарегестрироваться</Button>
			</form>
			<div className={styles['links']}>
				<Link to="/auth/login">Вход</Link>
			</div>
		</div>
	);
}