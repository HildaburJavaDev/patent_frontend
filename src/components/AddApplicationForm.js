import React, { useState, useContext } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { create } from '../http/ApplicationAPI';
import { Context } from '../index';

const MyModal = ({ show, handleClose }) => {
	const { user } = useContext(Context);
	const [formData, setFormData] = useState({
		modelView: '',
		modelTitle: '',
		modelDescription: '',
		modelFormula: '',
		modelFigures: '',
		modelAbstract: '',
		concentToIndicateInfo: false,
		openPublicConclusion: false,
		tesisDescription: 'fddf',
		coAuthors: [user._user.id]
	});

	console.log(user._user.id);

	const [formError, setFormError] = useState('');

	const handleChange = (e) => {
		const { id, value, type, checked } = e.target;
		setFormData(prevState => ({
			...prevState,
			[id]: type === 'checkbox' ? checked : value
		}));
	};

	const handleCoAuthorChange = (index, e) => {
		const { value } = e.target;
		const coAuthors = [...formData.coAuthors];
		coAuthors[index] = value;
		setFormData(prevState => ({
			...prevState,
			coAuthors
		}));
	};

	const addCoAuthor = () => {
		setFormData(prevState => ({
			...prevState,
			coAuthors: [...prevState.coAuthors, '']
		}));
	};

	const removeCoAuthor = (index) => {
		const coAuthors = formData.coAuthors.filter((_, i) => i !== index);
		setFormData(prevState => ({
			...prevState,
			coAuthors
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const requiredFields = ['modelView', 'modelTitle', 'modelDescription'];
		const emptyFields = requiredFields.filter(field => !formData[field]);
		console.log(formData.coAuthors)
		if (emptyFields.length === 0) {
			console.log(formData);
			try {
				const data = await create(user._user.id, formData);
				alert("Успешно");
				setFormError('');
			} catch (error) {
				setFormError('Ошибка при отправке данных');
			}
		} else {
			setFormError('Заполните все обязательные поля');
		}
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Создание новой заявки</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{formError && <div className="alert alert-danger">{formError}</div>}
				<Form onSubmit={handleSubmit}>
					<Form.Group controlId="modelView">
						<Form.Label>Тип</Form.Label>
						<Form.Control type="text" placeholder="Введите тип" onChange={handleChange} />
					</Form.Group>
					<Form.Group controlId="modelTitle">
						<Form.Label>Название</Form.Label>
						<Form.Control type="text" placeholder="Введите название" onChange={handleChange} />
					</Form.Group>
					<Form.Group controlId="modelDescription">
						<Form.Label>Описание</Form.Label>
						<Form.Control as="textarea" rows={3} placeholder="Введите описание" onChange={handleChange} />
					</Form.Group>
					<Form.Group controlId="modelFormula">
						<Form.Label>Формула</Form.Label>
						<Form.Control as="textarea" rows={3} placeholder="Введите формулу" onChange={handleChange} />
					</Form.Group>
					<Form.Group controlId="modelFigures">
						<Form.Label>Фигуры</Form.Label>
						<Form.Control as="textarea" rows={3} placeholder="Введите фигуры" onChange={handleChange} />
					</Form.Group>
					<Form.Group controlId="modelAbstract">
						<Form.Label>Реферат</Form.Label>
						<Form.Control as="textarea" rows={3} placeholder="Введите реферат" onChange={handleChange} />
					</Form.Group>
					<Form.Group controlId="concentToIndicateInfo">
						<Form.Check
							type="checkbox"
							label="Согласие на публикацию информации"
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group controlId="openPublicConclusion">
						<Form.Check
							type="checkbox"
							label="Согласие на открытую публикацию"
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group controlId="tesisDescription">
						<Form.Label>Тезисное описание</Form.Label>
						<Form.Control as="textarea" rows={3} placeholder="Введите тезисное описание" onChange={handleChange} />
					</Form.Group>

					<Form.Label>Авторы</Form.Label>
					{formData.coAuthors.map((coAuthor, index) => (
						<div key={index} className="mb-3">
							<Row>
								<Col>
									<Form.Control
										type="text"
										placeholder="ID соавтора"
										value={coAuthor}
										onChange={(e) => handleCoAuthorChange(index, e)}
									/>
								</Col>
								<Col xs="auto">
									<Button
										variant="danger"
										onClick={() => removeCoAuthor(index)}
									>
										Удалить
									</Button>
								</Col>
							</Row>
						</div>
					))}
					<Button variant="secondary" onClick={addCoAuthor}>
						Добавить соавтора
					</Button>

					<Button variant="primary" type="submit" className="mt-3">
						Создать
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default MyModal;
