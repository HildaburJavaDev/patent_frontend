import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './styles/ApplicationDetails.css';
import { getFile } from '../http/ApplicationAPI';
import { Button } from 'react-bootstrap';
import { Context } from '../index';
import AddApplicationForm from './AddApplicationForm';

const ApplicationDetails = ({ application }) => {
	const [showAddModal, setShowAddModal] = useState(false);
	const { user } = useContext(Context);
	console.log("USER " + JSON.stringify(user.user.role_name))

	const handleDownload = (event, filepath) => {
		event.preventDefault();
		getFile(filepath);
	};

	return (
		<div className="applications-list" style={{ marginTop: '15px', marginBottom: '15px' }}>
			{user.user.role_name === 'user' &&
				<Button variant="primary" style={{ position: 'fixed', bottom: '10px', right: '10px' }} onClick={() => setShowAddModal(true)}>+</Button>
			}
			<h3>Поданные заявки:</h3>
			<table style={{ marginTop: '30px' }}>
				<thead>
					<tr>
						<th>Id</th>
						<th>Заявитель</th>
						<th>Тип</th>
						<th>Название</th>
						<th>Дата создания</th>
						<th>Согласие</th>
						<th>Статус</th>
						<th>Заявление</th>
					</tr>
				</thead>
				<tbody>
					{application && application.map(app => (
						<tr key={app.id}>
							<td><Link to={`/applications/${app.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
								{app.id}
							</Link></td>
							<td><Link to={`/applications/${app.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
								{app.chief}
							</Link></td>
							<td><Link to={`/applications/${app.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
								{app.modelView}
							</Link></td>
							<td><Link to={`/applications/${app.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
								{app.modelTitle}
							</Link></td>
							<td><Link to={`/applications/${app.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
								{app.createdAt}
							</Link></td>
							<td><Link to={`/applications/${app.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
								{app.personalData}
							</Link></td>
							<td><Link to={`/applications/${app.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
								{app.status}
							</Link></td>
							<td><a href={`/api/download/${app.filepath}`} download onClick={(e) => handleDownload(e, app.filepath)}>Скачать файл</a></td>
						</tr>
					))}
				</tbody>
			</table>
			<AddApplicationForm show={showAddModal} handleClose={() => setShowAddModal(false)} />
		</div >
	);
};

export default ApplicationDetails;
