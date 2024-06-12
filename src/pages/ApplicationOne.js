import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ApplicationOneComponent from '../components/ApplicationOneComponent';
import { getOne } from '../http/ApplicationAPI';

const ApplicationPage = () => {
	const [application, setApplication] = useState(null);
	const { bidid } = useParams();

	useEffect(() => {
		const fetchApplication = async () => {
			try {
				console.log("что не вызываешься")
				const data = await getOne(bidid);
				setApplication(data);
			} catch (error) {
				console.error('Error fetching Application details:', error);
			}
		};
		fetchApplication();
	}, [bidid]);

	console.log("Application:", application);

	return (
		<Container>
			{application ? <ApplicationOneComponent application={application} /> : "Loading..."}
		</Container>
	);
};

export default ApplicationPage;
