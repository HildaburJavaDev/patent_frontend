import React, { useState, useEffect } from 'react';
import { updatepersonal } from '../http/userAPI';

const PersonalDataForm = () => {
	const [mail_index, setMailIndex] = useState('');
	const [country_name, setCountryName] = useState('');
	const [locality, setLocality] = useState('');
	const [street_name, setStreetName] = useState('');
	const [house_number, setHouseNumber] = useState('');
	const [flat_number, setFlatNumber] = useState(null);

	useEffect(() => {
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const userData = {
			mail_index: mail_index,
			country_name: country_name,
			locality: locality,
			street_name: street_name,
			house_number: house_number,
			flat_number: flat_number
		};
		try {
			console.log("Ну жу")
			const data = await updatepersonal(userData);
			alert(JSON.stringify(data));
		} catch (error) {
			alert('Ошибка')
		}
	};

	return (
		<div className="form-container">
			<div className="form-group">
				<label htmlFor="firstName">Почтовый индекс</label>
				<input
					className="form-control"
					type="text"
					id="firstName"
					placeholder="Введите почтовый индекс"
					value={mail_index}
					onChange={(e) => setMailIndex(e.target.value)}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="lastName">Страна</label>
				<input
					className="form-control"
					type="text"
					id="lastName"
					placeholder="Введите страну проживания"
					value={country_name}
					onChange={(e) => setCountryName(e.target.value)}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="phoneNumber">Город</label>
				<input
					className={`form-control`}
					type="text"
					id="phoneNumber"
					placeholder="Введите город проживания"
					value={locality}
					onChange={(e) => setLocality(e.target.value)}
				/>
				{<div className="invalid-feedback"></div>}
			</div>

			<div className="form-group">
				<label htmlFor="email">Улица</label>
				<input
					className={`form-control`}
					type="text"
					id="email"
					placeholder="Введите название улицы"
					value={street_name}
					onChange={(e) => setStreetName(e.target.value)}
				/>
				{<div className="invalid-feedback"></div>}
			</div>

			<div className="form-group">
				<label htmlFor="password">Дом</label>
				<input
					className="form-control"
					type="text"
					id="password"
					placeholder="Введите номер дома"
					value={house_number}
					onChange={(e) => setHouseNumber(e.target.value)}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="password">Квартира</label>
				<input
					className="form-control"
					type="text"
					id="password"
					placeholder="Введите номер квартиры"
					value={flat_number}
					onChange={(e) => setFlatNumber(e.target.value)}
				/>
			</div>

			<button className="btn btn-primary" type="submit" onClick={handleSubmit}>
				Register User
			</button>
		</div>
	);
};

export default PersonalDataForm;
