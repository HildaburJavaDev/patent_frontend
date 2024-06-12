import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import './styles/ApplicationDetails.css';
import { changeStatus, getFile } from '../http/ApplicationAPI';
import { Context } from '../index';

const ApplicationOneComponent = ({ application }) => {
	const { bidid } = useParams();
	const { user } = useContext(Context);

	const handleDownload = (event, filepath) => {
		event.preventDefault();
		getFile(filepath);
	};

	const handleAccept = async () => {
		const answer = await changeStatus(bidid, 'Принято');
		alert(answer)
	};

	const handleReject = async () => {
		const answer = await changeStatus(bidid, 'Отклонено');
		alert(answer)
	};

	if (!application) {
		return <div>Loading...</div>;
	}

	return (
		<div className="applications-list" style={{ marginTop: '15px', marginBottom: '15px' }}>
			<h3>Application Details</h3>
			<Table striped bordered hover>
				<tbody>
					<tr>
						<td>Вид</td>
						<td>{application.modelView}</td>
					</tr>
					<tr>
						<td>Название</td>
						<td>{application.modelTitle}</td>
					</tr>
					<tr>
						<td>Описание</td>
						<td>{application.modelDescription}</td>
					</tr>
					<tr>
						<td>Формула</td>
						<td>{application.modelFormula}</td>
					</tr>
					<tr>
						<td>Фигуры</td>
						<td>{application.modelFigures}</td>
					</tr>
					<tr>
						<td>Реферат</td>
						<td>{application.refer}</td>
					</tr>
					<tr>
						<td>Дата создания</td>
						<td>{new Date(application.createdAt).toLocaleDateString()}</td>
					</tr>
					<tr>
						<td>Согласие на обработку персональных данных</td>
						<td>{new Date(application.personalDataProcessingDate).toLocaleDateString()}</td>
					</tr>
					<tr>
						<td>Согласие на публикацию данных</td>
						<td>{application.concentToIndicateInfo.toString()}</td>
					</tr>
					<tr>
						<td>Возможность открытого опубликования</td>
						<td>{application.openPublicConclusion.toString()}</td>
					</tr>
					<tr>
						<td>Тезисное описание</td>
						<td>{application.tesisDecription}</td>
					</tr>
					<tr>
						<td>Статус</td>
						<td>{application.status}</td>
					</tr>
					<tr>
						<td>Владелец ID</td>
						<td>{application.applicant_id}</td>
					</tr>
					<tr>
						<td>Скачать заявку</td>
						<td><a href={`/api/download/${application.filepath}`} download onClick={(e) => handleDownload(e, application.filepath)}>Скачать файл</a></td>
					</tr>
				</tbody>
			</Table>
			{user?.user?.role_name === 'admin' || user?.user?.role_name === 'moderator' ? (
				<div style={{ marginTop: '15px' }}>
					<Button variant="success" onClick={handleAccept}>
						Принять
					</Button>{' '}
					<Button variant="danger" onClick={handleReject}>
						Отклонить
					</Button>
				</div>
			) : null}
		</div>
	);
};

export default ApplicationOneComponent;
