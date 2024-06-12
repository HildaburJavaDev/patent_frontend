import axios from './axiosConfig';

export const getAll = async () => {
	const { data } = await axios.get('/api/applications/');
	console.log(data)
	return data
}

export const getOne = async (bidid) => {
	const { data } = await axios.get(`/api/applications/${bidid}`);
	console.log("HER!!!" + data)
	return data
}

export const create = async (userId, app) => {
	console.log(app.tesisDescription)
	const { data } = await axios.post(`/api/applications/create`, {
		collaborators: app.coAuthors,
		modelView: app.modelView,
		modelTitle: app.modelTitle,
		modelDescription: app.modelDescription,
		modelFormula: app.modelFormula,
		modelFigures: app.modelFigures,
		concentToIndicateInfo: true,
		openPublicConclusion: app.openPublicConclusion,
		tesisDecription: app.tesisDescription,
		refer: app.modelAbstract
	})
	return data
}

export const changeStatus = async (bidid, status) => {
	const token = localStorage.getItem('token');
	await axios.patch(`/api/applications/${bidid}/changestatus`, { status: status }, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	return "success"
}

export const getFile = async (filename) => {
	try {
		console.log("Выполняется")
		const response = await axios.get(`/api/download/${filename}`, {
			responseType: 'blob',
		});
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', filename);
		document.body.appendChild(link);
		link.click();
		link.parentNode.removeChild(link);
	} catch (error) {
		console.error('Error downloading file: ', error);
	}
};
