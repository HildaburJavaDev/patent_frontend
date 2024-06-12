import React, { useEffect, useState } from 'react';
import axios from '../http/axiosConfig';

const Profile = ({ user }) => {
	const [profileData, setProfileData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProfileData = async () => {
			try {
				const response = await axios.get(`/api/user/${user._user.id}`);
				console.log(response)
				setProfileData(response.data);
				setLoading(false);
			} catch (err) {
				setError(err.message);
				setLoading(false);
			}
		};

		fetchProfileData();
	}, [user._user.id]);

	const formatPhoneNumber = (phoneNumber) => {
		const cleaned = ('' + phoneNumber).replace(/\D/g, '');
		const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
		if (match) {
			return '8 (' + match[2] + ') ' + match[3] + ' ' + match[4] + '-' + match[5];
		}
		return phoneNumber;
	};

	if (loading) {
		return <div>Загрузка...</div>;
	}

	if (error) {
		return <div>Ошибка: {error}</div>;
	}

	const formattedPhoneNumber = formatPhoneNumber(profileData.phoneNumber);

	return (
		<div>
			<h2>Профиль</h2>
			<p>ID: {profileData.id}</p>
			<p>Имя: {profileData.firstname}</p>
			<p>Email: {profileData.email}</p>
			<p>Номер телефона: {formattedPhoneNumber}</p>
		</div>
	);
};

export default Profile;
