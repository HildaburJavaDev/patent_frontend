import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../index';
import { useParams } from 'react-router-dom';
import ResponseItem from '../components/ResponseItem';
import { getResponseByStudent, setStudentGrade } from '../http/responsesAPI';

const ResponsesPage = () => {
	const [responses, setResponses] = useState([]);
	const [grade, setGrade] = useState('');
	const { user } = useContext(Context);
	const { lessonId, courseId, userId } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await getResponseByStudent(courseId, lessonId, userId);
				setResponses(response.data);
			} catch (error) {
				console.error('Failed to fetch responses:', error);
			}
		};

		fetchData();
	}, []);

	const handleGradeChange = (event) => {
		setGrade(event.target.value);
	};

	const handleSubmitGrade = async (event) => {
		event.preventDefault();
		try {
			const parsedGrade = parseInt(grade);
			if (isNaN(parsedGrade) || parsedGrade < 1 || parsedGrade > 5) {
				alert('Оценка должна быть числом от 1 до 5');
				return;
			}
			setStudentGrade(courseId, lessonId, userId, parsedGrade)
			console.log('Grade submitted:', parsedGrade);
		} catch (error) {
			console.error('Failed to submit grade:', error);
		}
	};

	return (
		<div className="responses-page">
			<div className="response-table">
				<h2>Responses Table</h2>
				<table>
					<thead>
						<tr>
							<th>Task Title</th>
							<th>Task Description</th>
							<th>Task Type</th>
							<th>Response Date</th>
							<th>Response Text</th>
						</tr>
					</thead>
					<tbody>
						{responses.map(response => (
							<ResponseItem key={response.id} response={response} />
						))}
					</tbody>
				</table>
			</div>
			<div className="grade-form" style={{ backgroundColor: '#f2f9f4', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
				<h2 style={{ color: '#28a745', marginBottom: '20px' }}>Grade Submission</h2>
				<form onSubmit={handleSubmitGrade}>
					<div style={{ marginBottom: '15px' }}>
						<input type="text" id="grade" placeholder="Grade" value={grade} onChange={handleGradeChange} style={{ padding: '8px', borderRadius: '5px', border: '1px solid #28a745' }} />
					</div>
					<button type="submit" className="btn btn-primary" style={{ backgroundColor: '#28a745', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Submit Grade</button>
				</form>
			</div>

		</div>
	);
};

export default ResponsesPage;
