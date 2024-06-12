import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllResponses } from '../http/responsesAPI';
import ResponsesList from '../components/ResponsesList';

const ResponseList = () => {
	const [responses, setResponses] = useState([]);
	const { lessonId, courseId } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await getAllResponses(courseId, lessonId);
				setResponses(response.data);
			} catch (error) {
				console.error('Failed to fetch responses:', error);
			}
		};

		fetchData();
	}, []);

	return (
		<div>
			<ResponsesList responses={responses} /> { }
		</div>
	);
};

export default ResponseList;
