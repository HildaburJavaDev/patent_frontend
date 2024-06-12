import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const AssignModeratorForm = () => {
	const [userId, setUserId] = useState('');
	const [message, setMessage] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const token = localStorage.getItem('token')
			const response = await axios.patch('http://localhost:8080/api/user/assignModerator', { userId }, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			if (response && response.status === 200) {
				setMessage('Пользователь успешно назначен модератором');
				setUserId('');
			} else {
				setMessage('Ошибка при назначении модератором');
			}
		} catch (error) {
			const errorMessage = error.response && error.response.data && error.response.data.message
				? error.response.data.message
				: 'Ошибка при назначении модератором';
			setMessage(errorMessage);
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group controlId="userId">
				<Form.Label>ID пользователя</Form.Label>
				<Form.Control
					type="text"
					placeholder="Введите ID пользователя"
					value={userId}
					onChange={(e) => setUserId(e.target.value)}
				/>
			</Form.Group>

			{message && <p className="text-info">{message}</p>}

			<Button variant="primary" type="submit">
				Назначить модератором
			</Button>
		</Form>
	);
};

export default AssignModeratorForm;
