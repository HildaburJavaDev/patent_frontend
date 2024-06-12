import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const ChangePasswordForm = () => {
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmNewPassword, setConfirmNewPassword] = useState('');
	const [passwordsMatch, setPasswordsMatch] = useState(true);
	const [message, setMessage] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (newPassword === confirmNewPassword) {
			setPasswordsMatch(true);

			try {
				const token = localStorage.getItem('token')
				const response = await axios.patch('http://31.128.38.122:8080/api/user/updatepassword', {
					password: newPassword
				}, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				});
				console.log(JSON.stringify(response))
				if (response && response.status === 200) {
					setMessage('Пароль успешно обновлен');
					setCurrentPassword('');
					setNewPassword('');
					setConfirmNewPassword('');
				} else {
					setMessage('Ошибка при обновлении пароля');
				}
			} catch (error) {
				const errorMessage = error.response && error.response.data && error.response.data.message
					? error.response.data.message
					: 'Ошибка при обновлении пароля';
				setMessage(errorMessage);
			}
		} else {
			setPasswordsMatch(false);
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group controlId="currentPassword">
				<Form.Label>Текущий пароль</Form.Label>
				<Form.Control
					type="password"
					placeholder="Введите текущий пароль"
					value={currentPassword}
					onChange={(e) => setCurrentPassword(e.target.value)}
				/>
			</Form.Group>

			<Form.Group controlId="newPassword">
				<Form.Label>Новый пароль</Form.Label>
				<Form.Control
					type="password"
					placeholder="Введите новый пароль"
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
				/>
			</Form.Group>

			<Form.Group controlId="confirmNewPassword">
				<Form.Label>Подтвердите новый пароль</Form.Label>
				<Form.Control
					type="password"
					placeholder="Подтвердите новый пароль"
					value={confirmNewPassword}
					onChange={(e) => setConfirmNewPassword(e.target.value)}
				/>
			</Form.Group>

			{!passwordsMatch && <p className="text-danger">Пароли не совпадают</p>}
			{message && <p className="text-info">{message}</p>}

			<Button variant="primary" type="submit">
				Сменить пароль
			</Button>
		</Form>
	);
};

export default ChangePasswordForm;
