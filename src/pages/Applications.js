import React, { useState, useEffect } from 'react';
import { getAll } from '../http/ApplicationAPI'; // Предположим, что у вас есть функция для получения данных модели
import ApplicationDetails from '../components/ApplicationDetails';

const ApplicationPage = () => {
	const [application, setApplication] = useState(null);

	useEffect(() => {
		const fetchApplication = async () => {
			try {
				const data = await getAll();
				setApplication(data);
			} catch (error) {
				console.error('Error fetching Application details:', error);
			}
		};
		fetchApplication();
	}, []);

	console.log("Application:", application);

	return (
		<div>
			{application ? <ApplicationDetails application={application} /> : "Loading..."}
		</div>
	);
};

export default ApplicationPage;
